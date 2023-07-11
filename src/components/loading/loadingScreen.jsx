import React from "react";
import "./style.scss"
import gif from '../../assets/images/loadingGIF/loading.gif'

const LoadingScreen = () => {
    return (
        <div className="fixed inset-0 flex justify-center items-center loading ">
        <img src={gif} alt="Loading page" />
      </div>
    )
}
export default LoadingScreen