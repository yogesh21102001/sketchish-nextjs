import React, { useEffect, useState } from "react";
import useProduct from "../../../../hooks/product/useProduct";
import "./style.css";

export const CategoryTopBar = ({ selectedType, onSelectType, type, selectedStyleSet, onSelectStyleSet }) => {
    const { useGetTypes, UseGetStyleSetAll } = useProduct()
    const { data } = useGetTypes();
    const [allStyleSet, setAllStyleSet] = useState()
    useEffect(() => {
        (async () => {
            const data = await UseGetStyleSetAll();
            setAllStyleSet(data?.map((styleSet) => { return { title: styleSet.title, count: (styleSet.iconCount || 0).toLocaleString() } }))
        })();
    }, [])


    return (
        <div className="category-top-bar">
            <div className="category-top-bar-filter-bar">
                <div className="category-top-bar-content">
                    <div className="category-top-bar-style">
                        {data?.map((type) => (
                            <div className="category-top-bar-tab3" onClick={() => onSelectType(type?.name)}>
                                {selectedType?.toLowerCase() == type?.name?.toLowerCase() ? <img src={`/icons/${type.name}_active.svg`} /> : <img src={`/icons/${type.name}.svg`} />}
                                <div className={selectedType?.toLowerCase() == type?.name?.toLowerCase() ? 'category-top-bar-label' : 'category-top-bar-label2'}>{type.name}</div>
                            </div >
                        ))}
                    </div>
                </div>

                <div className="category-top-bar-style">
                    {allStyleSet?.map(_s => (<>
                        {selectedStyleSet == _s.title ?
                            <div className="category-top-bar-tab3" onClick={() => onSelectStyleSet(_s.title)}>
                                <img src={`/icons/${_s.title}.svg`} />
                                <div className="category-top-bar-label">{_s.title}</div>
                            </div> : <div className="category-top-bar-tab3" onClick={() => onSelectStyleSet(_s.title)}>
                                <img src={`/icons/${_s.title}.svg`} />
                                <div className="category-top-bar-label3">{_s.title}</div>
                            </div>
                        }</>))}
                </div>
            </div>
        </div>
    );
};
