import "./style.css";
import PluginImage from '../../../../assets/imgs/PlugIn.png'
const Index = ({ ...props }) => {
    return (
        <div className="container">
            <div className="container-frame plugin-frame">
                <img src={PluginImage}></img>
            </div>
        </div>
    );
};
export default Index;