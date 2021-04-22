import React from "react";
import Axios from "axios";
class MicroFrontend extends React.Component {
  componentDidMount() {
    const {  host } = this.props;
    Axios.get(`${host}/asset-manifest.json`)
      .then(res => res.data)
      .then(manifest => {
        console.log(manifest)
        const scriptPathArr = [manifest.files['runtime-main.js'], manifest.files['static/js/0.chunk.js'], manifest.files['main.js']];
        this.renderRunScripst(scriptPathArr)
      });

  }


  renderRunScripst = (scriptPathArr) =>{
    const { name, host, document } = this.props;
    console.log(scriptPathArr)
    const scriptId = `micro-frontend-script-${name}-${scriptPathArr}`;
    scriptPathArr.forEach((path) => {
      if (!path) {
        return ;
      }
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
    console.log(window[`render${name}`], `render${name}`)
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
