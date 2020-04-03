import React from "react";
import Axios from "axios";
class MicroFrontend extends React.Component {
  componentDidMount() {
    const { name, host, document } = this.props;
    const scriptId = `micro-frontend-script-${name}`;

    // if (document.getElementById(scriptId)) {
    //   this.renderMicroFrontend();
    //   return;
    // }

    Axios.get(`${host}/asset-manifest.json`)
      .then(res => res.data)
      .then(manifest => {
        console.log(manifest);
        const scriptPathArr = [manifest.files['runtime-main.js'], manifest.files['static/js/0.chunk.js'], manifest.files['main.js']];
        this.renderRunScripst(scriptPathArr)
      })
      
      ;

    // fetch(`${host}/asset-manifest.json`)
    //   .then(res => res.json())
    //   .then(manifest => {
    //     console.log(manifest)
    //     const script = document.createElement('script');
    //     script.id = scriptId;
    //     script.crossOrigin = '';
    //     script.src = `${host}${manifest.files['main.js']}`;
    //     script.onload = this.renderMicroFrontend;
    //     script.type  = "text/javascript";
    //     document.body.appendChild(script);
    //   });
  }


  renderRunScripst = (scriptPathArr) =>{
    const { name, host, document } = this.props;
    const scriptId = `micro-frontend-script-${name}-${scriptPathArr}`;
    scriptPathArr.forEach((path) => {
      const script = document.createElement("script");
      script.type  = "text/javascript";
      script.id = scriptId;
      script.src = `${host}${path}`; 
      script.onload = this.renderMicroFrontend
      console.log(script);
      document.body.appendChild(script);
    })
  }

  componentWillUnmount() {
    const { name, window } = this.props;
    
    window[`unmount${name}`](`${name}-container`);
  }

  renderMicroFrontend = () => {
    const { name, window, history } = this.props;
    console.log(window);
    window[`render${name}`] && window[`render${name}`](`${name}-container`, history);
  };

  render() {
    return <main id={`${this.props.name}-container`} />;
  }
}

MicroFrontend.defaultProps = {
  document,
  window
};

export default MicroFrontend;
