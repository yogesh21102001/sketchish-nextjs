import React, { useEffect, useState } from "react";
import './style.css';
import useProduct from "../../../../hooks/product/useProduct";
export const ProductSidebar = ({ selectedCategory, selectedStyleSet, onSelectCategory, onSelectStyleSet }) => {
    const { UseGetStyleSetAll, UseGetCategoryAll } = useProduct()
    const [allCategory, setAllCategory] = useState()
    const [allStyleSet, setAllStyleSet] = useState()
    useEffect(() => {
        (async () => {
            const data = await UseGetStyleSetAll();
            setAllStyleSet(data?.map((styleSet) => styleSet.title))
        })();
        (async () => {
            const data = await UseGetCategoryAll();
            setAllCategory(data?.map((cat) => cat.name))
        })();
    }, [])
    return (
        <div class="left-bar" >
            <div class="style-sets-list">
                <div class="title">
                    <div class="style-sets">Style Sets</div>
                    <svg
                        class="icon-add"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M19 12L12 12M5 12L12 12M12 12L12 5M12 12L12 19"
                            stroke="#2F3037"
                            stroke-width="2"
                        />
                    </svg>
                </div>

                <div class={!selectedStyleSet ? "body-oneline active" : "body-oneline"} onClick={() => onSelectStyleSet()}>
                    <div class="text">All Style Sets</div>
                </div>
                {allStyleSet?.map(_s => (
                    <div class={selectedStyleSet == _s ? "body-oneline active" : "body-oneline"} onClick={() => onSelectStyleSet(_s)}>
                        <div class="text">{_s}</div>
                    </div>
                ))}

            </div>

            <div class="seperator">
                <div class="divider-horizontal"></div>
            </div>

            <div class="categories-list">
                <div class="title">
                    <div class="categories">Categories</div>

                    <svg
                        class="icon-add2"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M19 12L12 12M5 12L12 12M12 12L12 5M12 12L12 19"
                            stroke="#2F3037"
                            stroke-width="2"
                        />
                    </svg>
                </div>

                <div class={!selectedCategory ? "body-oneline active" : "body-oneline"} onClick={() => onSelectCategory()}>
                    <div class="text">All Categories</div>
                </div>
                {allCategory?.map(_c => (
                    <div class={selectedCategory == _c ? "body-oneline active" : "body-oneline"} onClick={() => onSelectCategory(_c)}>
                        <div class="text">{_c}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

