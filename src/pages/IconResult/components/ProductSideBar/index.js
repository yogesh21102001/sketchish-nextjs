import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import './style.css';
import useProduct from "../../../../hooks/product/useProduct";
import AdsComponent from "../../../../components/AdsComponent";
import AuthContext from "../../../../context/AuthProvider";
import Tooltip from '@mui/material/Tooltip';
import { isEmpty } from "lodash";
export const ProductSidebar = ({ mobileSideBar, setBucketPopUp, favBucketCount, selectedCategory, getAllBucketIcon, bucketData = [], isBucket, search, type, selectedStyleSet, onSelectCategory, onSelectStyleSet }) => {
    const { UseGetStyleSetAll, UseGetCategoryAll } = useProduct()
    const { auth } = useContext(AuthContext);
    const [isAds, setAds] = useState(true)
    const navigate = useNavigate()
    const [allCategory, setAllCategory] = useState()
    const [allStyleSet, setAllStyleSet] = useState()
    useEffect(() => {
        (async () => {
            const data = await UseGetStyleSetAll();
            setAllStyleSet(data?.map((styleSet) => { return { title: styleSet.title, count: (styleSet.iconCount || 0).toLocaleString() } }))
        })();
    }, [])
    useEffect(() => {
        if (auth?.userLimit?.planName && auth?.userLimit?.planName?.toLowerCase() != "basic") {
            setAds(false);
        }
    }, [auth])
    useEffect(() => {
        (async () => {
            const data = await UseGetCategoryAll({ type, search, styleSet: selectedStyleSet || 'all' });
            setAllCategory(data?.map((cat) => { return { name: cat.name, count: (cat.iconCount || 0).toLocaleString() } }))
        })();
    }, [selectedStyleSet, search, type])

    return (
        <div class="filter">
            {isAds && !mobileSideBar && <div className="group-37151">

                <Tooltip
                    title="Remove Ad"
                    placement="right-start"
                    componentsProps={{
                        tooltip: {
                            sx: {
                                color: "white",
                                backgroundColor: "red",
                                fontSize: "1em"
                            }
                        }
                    }}
                >
                    <svg
                        onClick={() => navigate('/pricing')}
                        className="group-37151__icon-close-circle"
                        width="27"
                        height="26"
                        viewBox="0 0 27 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="13.5" cy="13" r="13" fill="#1E3050" />
                        <path
                            d="M18.2096 8.29043L13.4429 13.0571M8.79045 17.7096L13.4429 13.0571M13.4429 13.0571L8.67623 8.29043M13.4429 13.0571L18.2096 17.8238"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </Tooltip>
                <div className="group-37151__rectangle-337">
                    {/* <AdsComponent dataAdSlot={6376052762}></AdsComponent> */}
                </div>
            </div>}
            {!isBucket && <div class="style">
                <div class="style2">STYLE</div>

                <div class="style-sets-dropdown-list">
                    {allStyleSet?.map(_s => (
                        <div class={selectedStyleSet == _s.title ? "body-oneline active" : "body-oneline"} onClick={() => onSelectStyleSet(_s.title)}>
                            <div class="standard">
                                <img src={"/icons/" + _s.title + '.svg'}></img>
                            </div>
                            <div class="standard2">{_s.title}</div>
                            <div class="_5-419">{_s.count}</div>
                        </div>
                    ))}
                </div>
            </div>}
            {isBucket && <div class="style">
                <div class="style2">MY BUCKETS<span className="svg-btn" onClick={setBucketPopUp}>CREATE</span></div>

                <div class="style-sets-dropdown-list">
                    <div class="body-oneline" onClick={() => getAllBucketIcon()}>
                        <div class="standard">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M17.8021 5.12949L17.8052 5.12978L17.1314 15.9111C17.0928 16.5288 16.6102 17.0184 16.0061 17.0772C15.9659 17.0812 15.925 17.0832 15.8838 17.0832H4.11621C3.86746 17.0832 3.63487 17.0103 3.43938 16.8842C3.11612 16.6757 2.8943 16.3217 2.86865 15.9111L2.19482 5.12979L2.19917 5.12935C2.12192 3.93385 3.08602 2.9165 4.30374 2.9165H15.6975C16.9153 2.9165 17.8794 3.93393 17.8021 5.12949ZM16.965 5.13753C17.048 4.40533 16.4655 3.74984 15.6975 3.74984H4.30374C3.52995 3.74984 2.94453 4.41526 3.03829 5.15411C3.11709 5.77519 3.65542 6.24983 4.30362 6.24983H15.6974C16.3369 6.24983 16.8841 5.7713 16.965 5.13753Z" fill="#1E3050" />
                            </svg>
                        </div>
                        <div class="standard2">Favorite</div>
                        <div class="_5-419">{favBucketCount || 0}</div>
                    </div>
                    {!isEmpty(bucketData) && bucketData?.map(_b => (
                        <div class="body-oneline" onClick={() => getAllBucketIcon(_b.id)}>
                            <div class="standard">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.8021 5.12949L17.8052 5.12978L17.1314 15.9111C17.0928 16.5288 16.6102 17.0184 16.0061 17.0772C15.9659 17.0812 15.925 17.0832 15.8838 17.0832H4.11621C3.86746 17.0832 3.63487 17.0103 3.43938 16.8842C3.11612 16.6757 2.8943 16.3217 2.86865 15.9111L2.19482 5.12979L2.19917 5.12935C2.12192 3.93385 3.08602 2.9165 4.30374 2.9165H15.6975C16.9153 2.9165 17.8794 3.93393 17.8021 5.12949ZM16.965 5.13753C17.048 4.40533 16.4655 3.74984 15.6975 3.74984H4.30374C3.52995 3.74984 2.94453 4.41526 3.03829 5.15411C3.11709 5.77519 3.65542 6.24983 4.30362 6.24983H15.6974C16.3369 6.24983 16.8841 5.7713 16.965 5.13753Z" fill="#1E3050" />
                                </svg>
                            </div>
                            <div class="standard2">{_b?.bucketName}</div>
                            <div class="_5-419">{_b?.count}</div>
                        </div>
                    ))}
                </div>
            </div>}
            {/* <div class="style">
                <div class="categories">CATEGORIES</div>
                <div class="categories-dropdown-list">
                    {allCategory?.map(_c => (
                        <div class={selectedCategory.includes(_c) ? "body-oneline active" : "body-oneline"} onClick={() => onSelectCategory(_c.name)}>
                            <div class="standard">
                                <img src={"/icons/" + _c.name + '.svg'}></img>
                            </div>
                            <div class="standard2">{_c.name}</div>
                            <div class="_5-419">{_c.count}</div>
                        </div>
                    ))}

                </div>
            </div> */}
        </div>

    );
};

