import { useState } from "react";
import iconTools1 from '../../../../assets/imgs/iconTools.svg'
import iconTools2 from '../../../../assets/imgs/iconTools2.svg'
import iconTools3 from '../../../../assets/imgs/iconTools3.svg'
import "./style.css";
const Index = ({ ...props }) => {
    const [index, setIndex] = useState(0)
    const imgs = [iconTools1, iconTools2, iconTools3]
    return (
        <div className="container">
            <div className="container-frame plugin-frame">
                <div className="frame-37534">
                    <div className="icon-tool-t1">
                        Icon tool that help you save a time and do work professionally{" "}
                    </div>
                    <div className="icon-tool-t2">
                        We&#039;ve got the right set of tools that work great to deliver
                        projects faster and better.{" "}
                    </div>
                </div>
                <div className="frame-37459-m">
                    <div className="frame-37442">
                        <div className="frame-37491">
                            <div className="frame-37447-m">
                                <div className={index == 0 ? "best-match" : 'no-best-match'} onClick={() => setIndex(0)}>Best Match </div>
                                <div className={index == 1 ? "best-match" : 'no-best-match'} onClick={() => setIndex(1)}>Customise </div>
                                <div className={index == 2 ? "best-match" : 'no-best-match'} onClick={() => setIndex(2)}>Bucket it </div>
                            </div>
                            {index == 0 ? <div className="do-the-best-match-our-icon-collection-with-your-brand-tone-yup-you-can-set-the-default-brand-colour-too-as-primary">
                                Do the best match our icon collection with your brand tone. Yup, you
                                can set the default brand colour too as primary.{" "}
                            </div> : ''}
                            {index == 1 ? <div className="change-the-colour-stroke-weight-icon-size-set-the-angle-or-rotate-it-animate-it-and-download-in-svg-png-and-pdf">
                                Change the colour, stroke weight, icon size, set the angle, or rotate
                                it, animate it and download in SVG, PNG, and PDF.{" "}
                            </div> : ''}
                            {index == 2 ? <div className="create-a-bucket-and-add-organised-your-favourite-icons-customise-icons-for-easy-to-use-whenever-and-wherever-you-want">
                                Create a bucket and add organised your favourite icons, customise
                                icons for easy to use whenever and wherever you want.{" "}
                            </div> : ''}
                        </div>
                    </div>
                </div>
                <div className="container-frame-content">
                    <div className="frame-37459">
                        <div className="frame-37442" onClick={() => setIndex(0)}>
                            <div className="frame-37491">
                                <div className="frame-37447">
                                    <div className={index == 0 ? "best-match" : 'customise'}>Best Match </div>
                                    {index == 0 ? <svg
                                        width="20"
                                        height="21"
                                        viewBox="0 0 20 21"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7 16.5L13 10L7 3.5" stroke="#676F7E" strokeWidth="2" />
                                    </svg> : <></>}
                                </div>
                            </div>
                            <div className="do-the-best-match-our-icon-collection-with-your-brand-tone-yup-you-can-set-the-default-brand-colour-too-as-primary">
                                Do the best match our icon collection with your brand tone. Yup, you
                                can set the default brand colour too as primary.{" "}
                            </div>
                        </div>
                        <div className="frame-37442" onClick={() => setIndex(1)}>
                            <div className="frame-37447">
                                <div className={index == 1 ? "best-match" : 'customise'}>Customise </div>
                                {index == 1 ? <svg
                                    width="20"
                                    height="21"
                                    viewBox="0 0 20 21"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7 16.5L13 10L7 3.5" stroke="#676F7E" strokeWidth="2" />
                                </svg> : <></>}
                            </div>
                            <div className="change-the-colour-stroke-weight-icon-size-set-the-angle-or-rotate-it-animate-it-and-download-in-svg-png-and-pdf">
                                Change the colour, stroke weight, icon size, set the angle, or rotate
                                it, animate it and download in SVG, PNG, and PDF.{" "}
                            </div>
                        </div>
                        <div className="frame-37442" onClick={() => setIndex(2)}>
                            <div className="frame-37491">
                                <div className="frame-37447">
                                    <div className={index == 2 ? "best-match" : 'customise'}>Bucket it </div> {index == 2 ? <svg
                                        width="20"
                                        height="21"
                                        viewBox="0 0 20 21"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7 16.5L13 10L7 3.5" stroke="#676F7E" strokeWidth="2" />
                                    </svg> : <></>}

                                </div>
                            </div>
                            <div className="create-a-bucket-and-add-organised-your-favourite-icons-customise-icons-for-easy-to-use-whenever-and-wherever-you-want">
                                Create a bucket and add organised your favourite icons, customise
                                icons for easy to use whenever and wherever you want.{" "}
                            </div>
                        </div>
                    </div>
                    <div className="flex1">
                        <img src={imgs[index]}></img>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Index;