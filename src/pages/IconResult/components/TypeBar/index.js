import React from "react";
import './style.css';
import useProduct from "../../../../hooks/product/useProduct";
export const TypeBar = ({ isUserAuthenticated, selectedType, onSelectType, isBucket, setBucket }) => {
    const { useGetTypes } = useProduct()
    const { data } = useGetTypes();

    return (
        <div class="tab-bar">
            {data?.map((type) => (
                <div class="body-oneline" onClick={() => onSelectType(type.name)}>
                    <div class="group-37123">
                        {selectedType?.toLowerCase() == type?.name?.toLowerCase() && !isBucket ? <img src={'/icons/' + type.name + '_active.svg'}></img> : <img src={'/icons/' + type.name + '.svg'}></img>}
                    </div>
                    {selectedType?.toLowerCase() == type?.name?.toLowerCase() && !isBucket ? <div class="classic active">{type.name}</div> : <div class="classic">{type.name}</div>}
                    {/* <div class="rectangle-9080400_2"></div> */}
                    {/* {selectedType?.toLowerCase() == type?.name?.toLowerCase() ? <div class="rectangle-9080400"></div> : <div class="rectangle-9080400_2"></div>} */}
                </div>
            ))}
            <div class="body-oneline" onClick={() => onSelectType('free')}>
                <div class="group-37123">
                    {selectedType?.toLowerCase() == 'free' && !isBucket ? <img src={'/icons/Free_active.svg'}></img> : <img src={'/icons/Free.svg'}></img>}
                </div>
                {selectedType?.toLowerCase() == 'free' && !isBucket ? <div class="classic active">Free</div> : <div class="classic">Free</div>}
                {/* {selectedType?.toLowerCase() == 'free' ? <div class="rectangle-9080400"></div> : <div class="rectangle-9080400_2"></div>} */}
            </div>
            <div class="body-oneline" onClick={() => onSelectType('brand')}>
                <div class="group-37123">
                    {selectedType?.toLowerCase() == 'brand' && !isBucket ? <img src={'/icons/Brand_active.svg'}></img> : <img src={'/icons/Brand.svg'}></img>}
                </div>
                {selectedType?.toLowerCase() == 'brand' && !isBucket ? <div class="classic active">Brand</div> : <div class="classic">Brand</div>}
                {/* {selectedType?.toLowerCase() == 'brand' ? <div class="rectangle-9080400"></div> : <div class="rectangle-9080400_2"></div>} */}
            </div>
            {isUserAuthenticated && <div class="body-oneline" onClick={() => setBucket(true)}>
                <div class="group-37123">
                    {isBucket ? <img src={'/icons/Bucket_active.svg'}></img> : <img src={'/icons/Bucket.svg'}></img>}
                </div>
                {isBucket ? <div class="classic active">Bucket</div> : <div class="classic">Bucket</div>}
                {/* {selectedType?.toLowerCase() == 'brand' ? <div class="rectangle-9080400"></div> : <div class="rectangle-9080400_2"></div>} */}
            </div>}
        </div>
    );
};

