import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ColorPicker from "../../../../components/ColorPicker/ColorPicker";
import { Popover } from "react-tiny-popover";
import { notifyError, notifySuccess } from "../../../../utils/notify";
import AdsComponent from "../../../../components/AdsComponent";
import useProduct from "../../../../hooks/product/useProduct";
import { isAuthenticated } from "../../../../utils/helpers";
import UseBucket from "../../../../hooks/bucket/useBucket";
import useUser from "../../../../hooks/user/user";
import useProductProcessor from "../../../../hooks/product/useProductProcessor";
import AuthContext from "../../../../context/AuthProvider";
import { Helmet } from "react-helmet";
import Tooltip from '@mui/material/Tooltip';
import AnimateController from "./MyAnimater";
import "./style.css";

/* Code generated with AutoHTML Plugin for Figma */
import "./add_bucket.css";
function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}
const _typeOptions = [{ label: 'Classic', value: 'Classic' }]
const bucketOptions = [{ label: 'Favourite', value: 'favourite' }]

export const AddToBucket = ({ bucketData, handleBucketChange }) => {
    return (
        <div className="add-to-bucket">
            <div className="add-to-bucket-container">
                <div className="add-to-bucket-frame-12">
                    <div className="add-to-bucket2">Add to bucket </div>
                </div>
                <div className="add-to-bucket-body-oneline" onClick={() => handleBucketChange('Favorite')}>
                    <div className="add-to-bucket-option">Favorite </div>
                </div>
                {typeof bucketData == 'object' && bucketData?.map((bucket) => (<div className="add-to-bucket-body-oneline" onClick={() => handleBucketChange(bucket?.id)}>
                    <div className="add-to-bucket-option">{bucket?.bucketName}</div>
                </div>
                ))}
            </div>
        </div>
    );
};

export function DetailView({
    bucketData,
    isUserAuthenticated,
    label,
    tags,
    setIsLoginOpen,
    iconStyleSet,
    setCurrentCat,
    defaultType,
    isUpgrade = false,
    full = false
}) {
    const navigate = useNavigate()
    const { auth } = useContext(AuthContext);
    const [isAds, setAds] = useState(true)
    const [isBucketPopover, setBucketPopover] = useState(false)
    const [bucktListData, setBucketListData] = useState(bucketOptions);
    const [productRelatedIcon, setProductRelatedIcon] = useState();
    const [detailOfProduct, setDetailOfProduct] = useState();
    const [type, setType] = useState(defaultType);
    const [AnimateC, setAnimateC] = useState();
    const [isAnimated, setAnimated] = useState(false);
    const [drawOneByOne, setDrawOneByOne] = useState(false);
    const [typeOptions, setTypeOptions] = useState([]);
    const [productId, setProductId] = useState();
    const [paid, setPaid] = useState();
    const [detail, setDetail] = useState();
    const [colorPickerIndex, setColorPickerIndex] = useState(null);
    const [isFileType, setFileType] = useState("svg");
    const id = JSON.parse(localStorage.getItem("user"));
    const { UseBucketList, UseAddBucketIcons, UseAddBucketIconsFav } =
        UseBucket();
    const { UseGetProductByLabel, UseSetProdDet, getDownloadProduct } = useProduct();

    const { useGetProfile } = useUser();
    const { processSimpSVG } = useProductProcessor();
    const { userDet, mutate } = useGetProfile();
    const [isPreview, setPreview] = useState(
        detail?.previewUrl
            ? detail?.previewUrl
            : detailOfProduct?.variant?.previewUrl
    );
    const [open, setOpen] = useState(false);
    // color
    const [colors, setColors] = useState(["#000"]);
    const [newColors, setNewColors] = useState([]);
    const [isBGColor, setBGColor] = useState("notset");
    //Size
    const [isSize, setSize] = useState(48);
    //Stroke Width
    const [isStrokeSize, setStrokeSize] = useState(2.0);
    const getProductByLabel = async (label) => {
        const data = await UseGetProductByLabel(label);
        //const _typeOptions = []
        data.map(_d => {
            if (!_typeOptions.find(_t => _t.label == _d.type)) {
                _typeOptions.push({ label: _d.type, value: _d.type })
            }
        })
        setTypeOptions(_typeOptions)
        const _icon = data?.find(_i => _i.styleSet == iconStyleSet && _i.type == type) || data?.[0]
        setProductRelatedIcon(data);
        setPaid(_icon?.paid);
        setDetail(_icon);
        setPreview(_icon?.previewUrl)
        setProductId(_icon?._id);
        // if (typeof setCurrentCat == "function") {
        //     setCurrentCat(_icon?.category)
        // }
    };
    const getDetailProduct = async (id) => {
        try {
            if (isUserAuthenticated) {
                const data = await UseSetProdDet(id);

                setDetailOfProduct(data);
            } else {
                console.log("User is not authenticated.");
            }
        } catch (error) {
            console.log("Error occurred:", error);
        }
    };
    const getBucktList = async () => {
        if (isAuthenticated()) {
            const response = await UseBucketList({
                id: id.id ? id.id : id._id,
            });
            if (response && typeof response === "object") {
                const _buckets = response?.map(_b => { return { label: _b.bucketName, value: _b._id, userId: _b.userId } })
                console.log("_buckets>>>", _buckets);
                setBucketListData([...bucktListData, ..._buckets]);
            }
        }
    };
    const handleColorChange = (index, color) => {
        const newColorsCopy = [...newColors];
        newColorsCopy[index] = color;

        setNewColors(newColorsCopy);
    };
    const handleTypeChange = (type) => {
        setType(type)

        const _res = productRelatedIcon?.find(_pI => _pI.type.toLowerCase() === type.toLowerCase() && _pI.styleSet.toLowerCase() === detail?.styleSet.toLowerCase())
        if (_res) {
            setProductId(_res._id);
            setPaid(_res.paid);
            setDetail(_res);
        } else {
            const _productRelatedIcon = productRelatedIcon?.filter(_pI => _pI.type.toLowerCase() === type.toLowerCase())
            setProductId(_productRelatedIcon[0]._id);
            setPaid(_productRelatedIcon[0].paid);
            setDetail(_productRelatedIcon);
        }
    }
    const checkAuth = () => {
        if (!isAuthenticated()) {
            if (full) {
                setIsLoginOpen(true)
            } else {
                window.open('/signin')
            }
            return false
        }
        return true
    }
    const handleStrokeChange = (v) => {
        if (checkAuth()) {
            setStrokeSize(v)
        }
    }
    const handleSizeChange = (v) => {
        if (checkAuth()) {
            setSize(v)
        }
    }
    const handleFormetChange = (v) => {
        if (checkAuth()) {
            if (v.toLowerCase() != 'svg') {
                setAnimated(false);
            }
            setFileType(v)
        }
    }
    const addBucketIcons = async (userId, buketId) => {
        const payloadData = {
            userId: userId,
            bucketId: buketId,
            productVariantId: productId,
        };
        const response = await UseAddBucketIcons(payloadData);
        if (response == "Product already in bucket!") {
            notifySuccess(response);
        } else if (response == "OK") {
            notifySuccess("Product Icon added to Bucket.");
        }
    };
    const addBucketIconsFav = async () => {
        const payloadData = {
            userId: id.id ? id.id : id._id,
            productVariantId: productId,
        };
        const response = await UseAddBucketIconsFav(payloadData);
        if (response == "Product already in bucket!") {
            notifySuccess(response);
        } else if (response == "OK") {
            notifySuccess("Product Icon add your Bucket!");
        }
    };
    const handleBucketChange = async (v) => {
        setBucketPopover(false);
        if (v == 'Favorite') {
            await addBucketIconsFav()
        } else {
            const localUser = JSON.parse(localStorage.getItem("user"))
            await addBucketIcons(localUser.id || localUser._id, v);
        }
    }
    const handleDownload = async ({ id, isCopy }) => {
        const setPreferences = {
            id,
            name: label,
            type: isFileType,
            size: isSize,
            isCopy,
            searchKeyword: tags,
            strokeWidth: isStrokeSize,
            bgColor: isBGColor,
            brokeStroke: false,
            oldColors: colors,
            newColors: newColors,
            animated: isAnimated
        };
        console.log('setPreferences', setPreferences)
        if (checkAuth()) {
            const usr = isAuthenticated();
            if (paid) {
                getDownloadProduct(setPreferences);
            } else {
                if (usr && usr.subscription && usr.subscription.isSubscribed) {
                    getDownloadProduct(setPreferences);
                } else {
                    if (isFileType === "svg") {
                        console.log('userDet?.downloadAble', userDet)
                        if (userDet?.downloadAble) {
                            getDownloadProduct(setPreferences);
                        } else {
                            setOpen(false);
                        }
                    } else {
                        getDownloadProduct(setPreferences);
                    }
                }
            }
            if (isAnimated) {
                if (isCopy) {
                    AnimateC.copy()
                    notifySuccess("Copied to your clipboard");
                } else {
                    AnimateC.download()
                }
            }
        }
    };
    const copyUrl = async (url) => {
        await navigator.clipboard.writeText(
            window.location.protocol + '//' + window.location.host + '/icon/' + detail?.label + '?s=' + detail?.styleSet);
        notifySuccess("Copied to your clipboard");
    }
    const isColorReset = () => {
        let result = false;
        if (!arraysEqual(colors, newColors)) {
            result = true;
        }
        if (isSize != 48) {
            result = true;
        }
        if (isStrokeSize != 2.0) {
            result = true;
        }
        return result;
    };
    const resetAll = () => {
        setSize(48);
        setStrokeSize(2.0);
        setNewColors(colors);
    }
    const handleAnimater = (v) => {
        const res = _productRelatedIcon.find(_p => _p.styleSet.toLowerCase() == 'standard')
        if (res) {
            setProductId(res._id);
            setPaid(res.paid);
            setDetail(res);
            setPreview(res.previewUrl)
            resetAll();
            setAnimated(v);
        }
    }
    const checkLimit = () => {
        if (!isAuthenticated()) {
            setIsLoginOpen(true);
            return false;
        }
        if (!userLimit?.isDownloadble) {
            notifyError('Limit exceeded! Upgrade to Continue');
        }
        return userLimit?.isDownloadble
    }
    useEffect(() => {
        if (isUserAuthenticated) {
            if (productId) {
                getDetailProduct(productId);
            }
        }
    }, [productId, isUserAuthenticated]);
    useEffect(() => {
        getBucktList();
    }, []);
    useEffect(() => {
        getProductByLabel(label);
    }, [label]);
    useEffect(() => {
        if (detailOfProduct?.variant?.svg && userDet?.downloadAble) {
            const res = processSimpSVG(
                detailOfProduct?.variant?.svg,
                isBGColor,
                isStrokeSize,
                colors,
                newColors
            );
            if (isAnimated) {
                const _animate = new AnimateController(label, 'IconPage_iconWraper_svg')
                setAnimateC(_animate)
                if (drawOneByOne) {
                    _animate.draw({ type: 'oneByOne' })
                } else {
                    _animate.draw({})
                }
            }
            setPreview(res.svg);
            setColors(res.oldColor);
            if (newColors.length === 0) setNewColors(res.oldColor);
            if (newColors.length !== 0 && res.oldColor.length !== newColors.length)
                setNewColors(res.oldColor);
        } else {
            setPreview(detail?.previewUrl ? detail?.previewUrl : detailOfProduct?.variant?.previewUrl);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        drawOneByOne,
        isAnimated,
        isBGColor,
        newColors,
        isStrokeSize,
        userDet?.downloadAble,
        detailOfProduct?.variant?.svg,
    ]);
    useEffect(() => {
        console.log('auth?.userLimit?.planName', auth?.userLimit?.planName)
        if (auth?.userLimit?.planName && auth?.userLimit?.planName?.toLowerCase() != "basic") {
            setAds(false);
        }
    }, [auth])
    const { userLimit } = auth
    const _productRelatedIcon = productRelatedIcon?.filter(_pI => _pI.type.toLowerCase() === type.toLowerCase())
    return (
        <>
            <Helmet>
                <meta id="meta-keywords" name="keywords" content={detail?.tags?.join(',')}></meta>
            </Helmet>
            <div className={full ? "IconPage_iconShowCaseCont full" : "IconPage_iconShowCaseCont"}>
                <div className="IconPage_lft">
                    <div className="IconPage_header">
                        <div className="IconPage_header_left">
                            <span className={type == 'Classic' ? 'active' : ''} onClick={() => handleTypeChange('Classic')}>Classic</span>
                            <span>•</span>
                            <span className={type == 'Sharp' ? 'active' : ''} onClick={() => handleTypeChange('Sharp')}>Sharp</span>
                        </div>
                        <div className="IconPage_header_right">
                            <span className={!isAnimated ? 'active' : ''} onClick={() => handleAnimater(false)}>Static</span>
                            <span>•</span>
                            <span className={isAnimated ? 'active' : ''} onClick={() => { if (checkLimit()) handleAnimater(true) }}>Animated</span>
                        </div>
                    </div>
                    <div style={{ height: '20px' }}></div>
                    {isAnimated && <div className="IconPage_header">
                        <div className="IconPage_header_left">
                            <span className='active' >Draw</span>
                        </div>
                        <div className="IconPage_header_right">
                            <span className={!drawOneByOne ? 'active' : ''} onClick={() => setDrawOneByOne(false)}>Syncronous</span>
                            <span>•</span>
                            <span className={drawOneByOne ? 'active' : ''} onClick={() => setDrawOneByOne(true)}>One By One</span>
                        </div>
                    </div>}
                    <div className="IconPage_iconShow">
                        <div className="IconPage_iconCont">
                            {!isAnimated && <div className="IconPage_iconWraper">
                                <img
                                    className={`i${isSize}px`}
                                    src={isPreview == undefined ? (detail?.previewUrl)?.replace('prod2/prod2', 'prod2') : (isPreview)?.replace('prod2/prod2', 'prod2')}
                                    alt=""
                                />
                            </div>}
                            <div id="IconPage_iconWraper_svg" className={isAnimated ? `IconPage_iconWraper i${isSize}px` : "IconPage_iconWraper hidden"}>

                            </div>
                            <div className="IconPage_iconColors">
                                <div className="IconPage_colorsCont">
                                    {colors?.map((color, index) => {
                                        return (
                                            <Popover
                                                key={index}
                                                isOpen={colorPickerIndex === index}
                                                positions={["bottom"]}
                                                padding={10}
                                                onClickOutside={() => setColorPickerIndex(null)}
                                                content={
                                                    <ColorPicker
                                                        initialColor={newColors[index]}
                                                        picker={"sketch"}
                                                        onChange={(e) => {
                                                            if (!isAuthenticated()) return setIsLoginOpen(true);
                                                            if (!userDet?.downloadAble) {
                                                                setOpen(false);
                                                                return;
                                                            }
                                                            handleColorChange(index, e);
                                                        }}
                                                    />
                                                }
                                            >
                                                <svg className="sr-cust-colr-dot" xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none" onClick={() => {
                                                    if (!isAuthenticated()) return setIsLoginOpen(true);
                                                    if (!userDet?.downloadAble) {
                                                        setOpen(false);
                                                        return;
                                                    }
                                                    setColorPickerIndex(
                                                        colorPickerIndex === index ? null : index
                                                    );
                                                }}>
                                                    <rect x="0.5" y="1" width="23" height="23" rx="11.5" fill={newColors[index]} />
                                                    <path opacity="0.5" d="M12 16.5L8 10.5L16 10.5L12 16.5Z" fill="white" />
                                                    <rect x="0.5" y="1" width="23" height="23" rx="11.5" stroke="white" />
                                                </svg>
                                            </Popover>
                                        );
                                    })}
                                </div>
                                {isColorReset() && isUserAuthenticated ? <div className="IconPage_reset" onClick={() => resetAll()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M12 17C15.4505 16.0977 18 12.9154 18 9.12803C18 4.63904 14.4183 1 10 1C5.58172 1 2 4.63904 2 9.12803C2 12.9154 4.54954 16.0977 8 17" stroke="#7238FA" strokeWidth="2" />
                                        <path d="M7.31132 11L8 17.2226L2 19" stroke="#7238FA" strokeWidth="2" />
                                    </svg>
                                </div> : <></>}
                            </div>
                        </div>
                        <div className="IconPage_iconTypesCont">
                            {_productRelatedIcon?.map((res) => {
                                return (<div className="IconPage_iconType" onClick={() => {
                                    if (res.styleSet?.toLowerCase() != "standard") {
                                        setAnimated(false);
                                    }
                                    setProductId(res._id);
                                    setPaid(res.paid);
                                    setDetail(res);
                                    setPreview(res.previewUrl)
                                    resetAll();
                                }}>
                                    <img src={(res?.previewUrl).replace('prod2/prod2', 'prod2')} alt="emailIcon" />
                                    {productId == res._id && <p style={{ color: "#7238FA" }}>{res?.styleSet}</p>}
                                    {productId != res._id && <p style={{ color: "grey" }}>{res?.styleSet}</p>}
                                </div>)
                            })}
                        </div>
                    </div>
                </div>
                <div className="IconPage_rgt">
                    <div>
                        <div className="IconPage_iconInfo">
                            <div className="IconPage_iconName">
                                <p>{detail?.label}</p>
                                <span>{detail?.paid == 1 ? 'pro' : 'free'}</span>
                                <img
                                    src="/static/media/Link.bbec4b4c267012bfa23b7e4625fbd8b1.svg"
                                    alt=""
                                    style={{ cursor: "pointer" }}
                                />
                                <svg
                                    onClick={copyUrl}
                                    className="icon-link"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M6 10H14"
                                        stroke="#C5CAD3"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M12 15L14 15C16.7614 15 19 12.7614 19 10V10C19 7.23858 16.7614 5 14 5L12 5"
                                        stroke="#C5CAD3"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M8 5L6 5C3.23857 5 0.999997 7.23858 0.999998 10V10C0.999999 12.7614 3.23858 15 6 15L8 15"
                                        stroke="#C5CAD3"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </div>
                            <p className="IconPage_category">
                                {detail?.category?.map((res, index) => {
                                    return (
                                        <div className="icon-cat" onClick={() => { navigate('/category/' + res) }} key={index}>
                                            <p>{res},</p>
                                        </div>
                                    );
                                })}
                            </p>
                            <p className="IconPage_report"><a className="license-info">{detail?.paid == 1 ? "Royalty--free License" : detail?.styleSet == "Brand" ? "Public Domain" : 'Must attribute'}</a><a href="https://discord.com/invite/QN3Zwf4KWK">Report</a></p>
                        </div>
                        <div className="IconPage_iconModify">
                            <p>stroke-weight</p>
                            <div className="IconPage_flex">
                                <span data-tooltip-id="stroke" data-tooltip-content="0.5 Pixel" className={isStrokeSize == 0.5 ? "IconPage_stoke active" : "IconPage_stoke"} onClick={() => handleStrokeChange(0.5)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="24" viewBox="0 0 4 24" fill="none"><path d="M2 2V22" stroke="#1E3050" strokeWidth="0.5" strokeLinecap="round"></path></svg>
                                </span>
                                <span data-tooltip-id="stroke" data-tooltip-content="1 Pixel" className={isStrokeSize == 1 ? "IconPage_stoke active" : "IconPage_stoke"} onClick={() => handleStrokeChange(1)} >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="24" viewBox="0 0 4 24" fill="none"><path d="M2 2V22" stroke="#1E3050" strokeWidth="1" strokeLinecap="round"></path></svg>
                                </span>
                                <span data-tooltip-id="stroke" data-tooltip-content="1.5 Pixel" className={isStrokeSize == 1.5 ? "IconPage_stoke active" : "IconPage_stoke"} onClick={() => handleStrokeChange(1.5)} >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="24" viewBox="0 0 4 24" fill="none"><path d="M2 2V22" stroke="#1E3050" strokeWidth="1.5" strokeLinecap="round"></path></svg>
                                </span>
                                <span data-tooltip-id="stroke" data-tooltip-content="2 Pixel" className={isStrokeSize == 2 ? "IconPage_stoke active" : "IconPage_stoke"} onClick={() => handleStrokeChange(2)} >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="24" viewBox="0 0 4 24" fill="none"><path d="M2 2V22" stroke="#1E3050" strokeWidth="2" strokeLinecap="round"></path></svg>
                                </span>
                                <span data-tooltip-id="stroke" data-tooltip-content="2.5 Pixel" className={isStrokeSize == 2.5 ? "IconPage_stoke active" : "IconPage_stoke"} onClick={() => handleStrokeChange(2.5)} >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="24" viewBox="0 0 4 24" fill="none"><path d="M2 2V22" stroke="#1E3050" strokeWidth="2.5" strokeLinecap="round"></path></svg>
                                </span>
                                <span data-tooltip-id="stroke" data-tooltip-content="3 Pixel" className={isStrokeSize == 3 ? "IconPage_stoke active" : "IconPage_stoke"} onClick={() => handleStrokeChange(3)} >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="24" viewBox="0 0 4 24" fill="none"><path d="M2 2V22" stroke="#1E3050" strokeWidth="3" strokeLinecap="round"></path></svg>
                                </span>
                                <span data-tooltip-id="stroke" data-tooltip-content="3.5 Pixel" className={isStrokeSize == 3.5 ? "IconPage_stoke active" : "IconPage_stoke"} onClick={() => handleStrokeChange(3.5)} >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="24" viewBox="0 0 4 24" fill="none"><path d="M2 2V22" stroke="#1E3050" strokeWidth="3.5" strokeLinecap="round"></path></svg>
                                </span>
                                <span data-tooltip-id="stroke" data-tooltip-content="4 Pixel" className={isStrokeSize == 4 ? "IconPage_stoke active" : "IconPage_stoke"} onClick={() => handleStrokeChange(4)} >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="24" viewBox="0 0 4 24" fill="none"><path d="M2 2V22" stroke="#1E3050" strokeWidth="4" strokeLinecap="round"></path></svg>
                                </span>
                            </div>
                        </div>
                        <div className="IconPage_iconModify">
                            <p>icon-size</p>
                            <div className="IconPage_optionsCont">
                                <div className={isSize == 16 ? "IconPage_iconSize IconPage_active" : "IconPage_iconSize"} onClick={() => handleSizeChange(16)}>
                                    16
                                </div>
                                <div className={isSize == 24 ? "IconPage_iconSize IconPage_active" : "IconPage_iconSize"} onClick={() => handleSizeChange(24)}>24</div>
                                <div className={isSize == 32 ? "IconPage_iconSize IconPage_active" : "IconPage_iconSize"} onClick={() => handleSizeChange(32)}>32</div>
                                <div className={isSize == 48 ? "IconPage_iconSize IconPage_active" : "IconPage_iconSize"} onClick={() => handleSizeChange(48)}>48</div>
                                <div className={isSize == 72 ? "IconPage_iconSize IconPage_active" : "IconPage_iconSize"} onClick={() => handleSizeChange(72)}>72</div>
                                <div className={isSize == 96 ? "IconPage_iconSize IconPage_active" : "IconPage_iconSize"} onClick={() => handleSizeChange(96)}>96</div>
                            </div>
                        </div>
                        <div className="IconPage_iconModify">
                            <p>file-format</p>
                            <div className="IconPage_optionsCont" >
                                <div className={isFileType == 'svg' ? "IconPage_iconSize IconPage_formate IconPage_active" : "IconPage_iconSize IconPage_formate"} onClick={() => handleFormetChange('svg')}>
                                    .svg
                                </div>
                                <div className={isFileType == 'png' ? "IconPage_iconSize IconPage_formate IconPage_active" : "IconPage_iconSize IconPage_formate"} onClick={() => handleFormetChange('png')}>
                                    .png
                                </div>
                                <div className={isFileType == 'pdf' ? "IconPage_iconSize IconPage_formate IconPage_active" : "IconPage_iconSize IconPage_formate"} onClick={() => handleFormetChange('pdf')}>
                                    .pdf
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="IconPage_btnCont">
                        {isUserAuthenticated && <Popover
                            isOpen={isBucketPopover}
                            positions={["bottom"]}
                            padding={10}
                            onClickOutside={() => setBucketPopover(false)}
                            content={<AddToBucket bucketData={bucketData} handleBucketChange={handleBucketChange}></AddToBucket>}>
                            <button className="Button_btn" onClick={() => setBucketPopover(!isBucketPopover)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <g id="Icon / Add">
                                        <path id="Line 439" d="M19 10L10 10M0.999999 10L10 10M10 10L10 1M10 10L10 19" stroke="#1E3050" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </g>
                                </svg>
                            </button>
                        </Popover>}
                        {isFileType !== 'pdf' && userLimit?.isDownloadble && <button className="Button_btn" onClick={() => handleDownload({ id: productId, isCopy: false })}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <g id="Icon / Downloads">
                                    <path id="Stroke 14815" d="M3 8.6L9.99999 15M9.99999 15L17 8.6M9.99999 15V1" stroke="#1E3050" strokeWidth="2" />
                                    <path id="Path" d="M17 19H3" stroke="#1E3050" strokeWidth="2" />
                                </g>
                            </svg>
                        </button>}
                        {isFileType !== 'pdf' && userLimit?.isDownloadble && <button className="Button_btn Button_btnActive Button_extraPadding" onClick={() => handleDownload({ id: productId, isCopy: true })}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <g id="Icon / Copy">
                                    <path id="Vector" d="M5 3H2V17C2 18.1046 2.89543 19 4 19H16V16" stroke="#1E3050" strokeWidth="2" strokeLinejoin="round" />
                                    <path id="Vector_2" d="M5 16H18V4L15 1H5V16Z" stroke="#1E3050" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </g>
                            </svg>
                            <span>.{isFileType}</span>
                        </button>}
                        {isFileType == 'pdf' && userLimit?.isDownloadble && <button className="Button_btn Button_btnActive Button_extraPadding" onClick={() => handleDownload({ id: productId, isCopy: false })}>
                            <span>Download</span>
                        </button>}
                        {isFileType == 'svg' && !userLimit?.isDownloadble && isAuthenticated() && <button className="Button_btn Button_btnActive Button_extraPadding" onClick={() => navigate('/pricing')}>
                            <span>Upgrade</span>
                        </button>}
                        {isFileType == 'png' && isAuthenticated() && <button className="Button_btn Button_btnActive Button_extraPadding" onClick={() => handleDownload({ id: productId, isCopy: false })}>
                            <span>Download</span>
                        </button>}
                        {!isAuthenticated() && <button className="Button_btn Button_btnActive Button_extraPadding" onClick={() => setIsLoginOpen(true)}>
                            <span>Login</span>
                        </button>}
                    </div>
                </div>
            </div >
        </>
    );
}
