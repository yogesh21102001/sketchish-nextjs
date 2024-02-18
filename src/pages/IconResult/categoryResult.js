import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { LandingPageHeader } from "../LandingPage/LandingPageHeader";
import Spinner from "../../components/spinner/spinner";
import { ClipLoader } from "react-spinners";
import { ResponsiveModal } from "../../components/ResponsiveModal";
import { IconNotFound } from "../../assets/svg";
import Modal from "../../containers/modal/modals";
import useProduct from "../../hooks/product/useProduct";
import LandingPageFooter from "../LandingPage/LandingPageFooter";
import AuthContext from "../../context/AuthProvider";
import Background from "../../assets/imgs/Background.svg";
import { isAuthenticated, replaceHyphensWithSpaces } from "../../../src/utils/helpers";
import NotFoundPage from "../../components/NotFoundPage/NotFoundPage";
import {
    SearchBar,
    CategoryTopBar,
    CategoryHeader,
    PaginationBar,
    DetailView,
} from "./components";
import "./style.css";
import "../StyleSet/style.css"
import { IconCard } from "../../ui";
import { IconSection } from "../StyleSet/components";

import {
    replaceSpacesWithHyphens,
} from "../../../src/utils/helpers";

import CommonStyle from "../../style/commonStyle.module.css"
import Footer from "../../components/Footer-v2/Footer";
import NavBar from "../../components/NavBar/NavBar";

function NoIconComponent() {
    return (
        <div className="empty-search-result">
            <div className="empty-search-result-inner">
                <IconNotFound />
                <div>
                    <h2>Icon Not Found</h2>
                    <p>
                        Looks like icon is not available.
                        <br />
                        Tell us about icon, we will create it for you.
                    </p>
                    <a href="https://discord.gg/QN3Zwf4KWK">Request Icon via Discord</a>
                </div>
            </div>
        </div>
    );
}

export function CategoryResult() {
    const navigator = useNavigate()
    const { auth } = useContext(AuthContext);
    const [isUserAuthenticated, setUserAuthenticated] = useState(isAuthenticated());
    const [searchParams, setSearchParams] = useSearchParams();
    const { style, search } = useParams();
    const tags = searchParams.get('tags');
    const styleset = replaceHyphensWithSpaces(searchParams.get('s'));
    const type = searchParams.get('t');
    const q = searchParams.get('search');
    const [catNotFound, setCatNotFound] = useState(1)
    const [label, setLabel] = useState()
    const [menuOpenState, setMenuOpenState] = useState(true);
    const [isFreeIcon, setFreeIcon] = useState(false);
    const [mobileMenuOpenState, setMobileMenuOpenState] = useState(true);
    const [productLoading, setProductLoading] = useState(true);
    const [iconStyleSet, setIconStyleSet] = useState(styleset)
    const { UseProductGet, UseGetStatistics } = useProduct();
    const [getAllProd, setGetAllProd] = useState([]);
    const [getFreeProd, setGetFreeProd] = useState([]);
    const [selectedType, setSelectedType] = useState(type || "Classic");
    const [currentCate, setCurrentCat] = useState([search]);
    const [detailViewOpen, setDetailViewOpen] = useState(false);
    const [statistics, setStatistics] = useState({});
    const [selectedStyleSet, setSelectedStyleSet] = useState(
        style?.split("-").join(" ")
    );
    const { ModalMain, setIsLoginOpen } = Modal();
    const handleChangeType = (v) => {
        if (v.toLowerCase() === 'brand') {
            searchParams.delete('cat')
            searchParams.delete('t')
            searchParams.append('t', v)
            navigator('/icons')
            setSelectedType(v)
            setCurrentCat([])
            setIconStyleSet('all')
        } else {
            searchParams.delete('t')
            searchParams.append('t', v)
            setSearchParams(searchParams)
            setSelectedType(v)
        }
    }
    const handleChangeStyleSet = (v) => {
        //navigator('/ca/' + v + '?' + searchParams.toString())
        setSelectedStyleSet(v)
    }
    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    const getIcons = async (page) => {
        scrollTop()
        const data = {
            type: selectedType,
            search: !q ? "null" : q,
            styleSet: selectedStyleSet == undefined ? "null" : selectedStyleSet,
            category: search
        };
        if (page) {
            data['page'] = page
        } else {
            data['page'] = 1
        }
        setProductLoading(true);
        const getData = await UseProductGet(data);
        console.log('currentCate', getData)
        setCatNotFound(getData?.totalCount)
        setGetAllProd(getData);
        setProductLoading(false);
    };
    const getIconsFree = async (page) => {
        const data = {
            type: 'free',
            search: !q ? "null" : q,
            styleSet: selectedStyleSet == undefined ? "null" : selectedStyleSet,
            category: currentCate.length == 0 ? "null" : currentCate.join(',')
        };
        if (page) {
            data['page'] = page
        } else {
            data['page'] = 1
        }
        setProductLoading(true);
        const getData = await UseProductGet(data);
        setGetFreeProd(getData);
        setProductLoading(false);
    };
    const nextPages = () => { if (getAllProd?.currentPage + 1 <= getAllProd?.totalPages) { getIcons(getAllProd?.currentPage + 1); } }
    const previousPage = () => { if (getAllProd?.currentPage - 1 >= 1) { getIcons(getAllProd?.currentPage - 1); } }
    useEffect(() => {
        getIcons();
        getIconsFree();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentCate, selectedType, selectedStyleSet, search, q]);
    useEffect(() => {
        (async () => {
            const getStatistics = await UseGetStatistics();
            setStatistics(getStatistics)
        })();
        scrollTop()
    }, [])
    useEffect(() => {
        if (localStorage.getItem("user")) {
            //setPlanName(localStorage.getItem("plan"));
            //const user = JSON.parse(localStorage.getItem("user"));
            setUserAuthenticated(true);
        } else {
            setUserAuthenticated(false);
        }
    }, [auth]);

    const [key, setKey] = useState(Math.random())


    useEffect(() => {
        setKey(Math.random())
    }, [search])

    if (catNotFound == 0) {
        return <NotFoundPage />
    }

    if (productLoading) {
        return <div class="spinner_loader">
            <ClipLoader color={"#123abc"} />
        </div>
    }

    return (
        <div>
            <NavBar />
            <div className="search-result-root">
                <CategoryHeader adKey={key} productLoading={productLoading} name={search} count={getAllProd?.totalCount} freeCount={getFreeProd?.totalCount} ></CategoryHeader>
                <div className="search-icon-deail-top" style={{ padding: 0 }}>
                    <div className="search-icon-detail-inner">
                        <div className="seach-icon-link">
                            <CategoryTopBar
                                selectedType={selectedType} onSelectType={handleChangeType}
                                selectedStyleSet={selectedStyleSet}
                                search={q}
                                type={selectedType}
                                onSelectStyleSet={handleChangeStyleSet} ></CategoryTopBar>
                        </div>
                    </div>

                </div>
                <div className="search-icon-detail-bottom">
                    <div className="search-icon-detail-inner" style={{ alignItems: 'flex-start' }}>
                        <div className="search-icon-detail-category-button-header">
                            <div className="free-only">
                                <div className="check-box">
                                    {isFreeIcon ? <div onClick={() => { setFreeIcon(false) }} className="checked"></div> : <div onClick={() => { setFreeIcon(true) }} className="not-checked"></div>}
                                </div>
                                <div className="free-only2">Free only</div>
                            </div>
                            <SearchBar
                                placeholder={`Search icons in ${selectedType?.toLowerCase()}...`}
                                isHeader
                                defaultValue={q}
                            ></SearchBar>
                        </div>
                        {/* <PaginationBar nextPages={nextPages} previousPage={previousPage} totalCount={getAllProd?.totalCount} removeTag={() => { }} totalPages={getAllProd?.totalPages} currentPages={getAllProd?.currentPage} tags={[]}></PaginationBar> */}
                        {!isFreeIcon ? <div className={CommonStyle.icon_cards_wraper} style={{ width: "100%" }}>
                            {getAllProd?.products?.length > 0 ? (
                                getAllProd?.products?.map((icon, index) => {
                                    return (
                                        <IconCard
                                            key={index}
                                            lable={icon?.label}
                                            pro={icon?.paid == 1 ? true : false}
                                            newIcon={false}
                                            preView={icon?.webpUrl ? icon?.webpUrl : icon?.previewUrl}
                                            onClick={() =>
                                                navigator(
                                                    `/icons/${replaceSpacesWithHyphens(icon.label)}?t=${type ? type : "Classic"}&s=${icon?.styleSet}`
                                                )
                                            }
                                        />
                                    );
                                })
                            ) : !productLoading ? (
                                <NoIconComponent></NoIconComponent>
                            ) : (
                                ""
                            )}
                        </div> : <div className={CommonStyle.icon_cards_wraper} style={{ width: "100%" }}>
                            {getAllProd?.products?.filter?.(_icons => _icons.paid == 0)?.length > 0 ? (
                                getAllProd?.products?.filter?.(_icons => _icons.paid == 0)?.map((icon, index) => {
                                    return (
                                        <IconCard
                                            key={index}
                                            lable={icon?.label}
                                            pro={icon?.paid == 1 ? true : false}
                                            newIcon={false}
                                            preView={icon?.webpUrl ? icon?.webpUrl : icon?.previewUrl}
                                            onClick={() =>
                                                navigator(
                                                    `/icons/${replaceSpacesWithHyphens(icon.label)}?t=${type ? type : "Classic"}&s=${icon?.styleSet}`
                                                )
                                            }
                                        />
                                        // <div
                                        //     className="icon-deatil-item"
                                        //     onClick={() => {
                                        //         setDetailViewOpen(true);
                                        //         setIconStyleSet(obj.styleSet)
                                        //         setLabel(obj.label);
                                        //     }}
                                        // >
                                        //     <img src={(obj.previewUrl).replace('prod2/prod2', 'prod2')} alt="emailIcon" />
                                        //     <p>{obj.label}</p>
                                        // </div>
                                    );
                                })
                            ) : !productLoading ? (
                                <NoIconComponent></NoIconComponent>
                            ) : (
                                ""
                            )}
                        </div>}
                    </div>
                </div>
            </div>
            <div className="StyleSet-container-bottom">
                <IconSection />
            </div>
            <Footer />

            {ModalMain()}
            <ResponsiveModal
                isOpen={detailViewOpen}
                onClose={() => setDetailViewOpen(false)}
                closeOnOverlayClick={false}
                component={
                    <DetailView
                        isUserAuthenticated={isUserAuthenticated}
                        label={label}
                        iconStyleSet={iconStyleSet}
                        tags={tags}
                        setIsLoginOpen={setIsLoginOpen}
                        defaultType={selectedType}
                    />
                }
            />
        </div >
    );
}
