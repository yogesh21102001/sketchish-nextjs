import React, { useEffect, useState, useContext } from "react";
import { useLocation, useParams, useNavigate, useSearchParams } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import levenshtein from 'js-levenshtein';
import { matchSorter } from 'match-sorter'
import { Popover } from "react-tiny-popover";
import { LandingPageHeader } from "../LandingPage/LandingPageHeader";
import Spinner from "../../components/spinner/spinner";
import { ResponsiveModal } from "../../components/ResponsiveModal";
import { IconNotFound } from "../../assets/svg";
import Modal from "../../containers/modal/modals";
import useProduct from "../../hooks/product/useProduct";
import useToggle from "../../hooks/useToggle";
import UseBucket from "../../hooks/bucket/useBucket";
import { notifySuccess } from "../../utils/notify";
import BucketDialog from "./components/BucketDialog/BucketDialog";
import LandingPageFooter from "../LandingPage/LandingPageFooter";
import AuthContext from "../../context/AuthProvider";
import { isAuthenticated, replaceHyphensWithSpaces, replaceSpacesWithHyphens } from "../../../src/utils/helpers";
import {
  SearchBar,
  ProductSidebar,
  TypeBar,
  PaginationBar,
  DetailView,
} from "./components";
import "./style.css";
import { Helmet } from "react-helmet";
import { isEmpty } from "lodash";

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

export function IconResult({ from }) {
  const navigator = useNavigate()
  const { auth } = useContext(AuthContext);
  const [isUserAuthenticated, setUserAuthenticated] = useState(isAuthenticated());
  const [searchParams, setSearchParams] = useSearchParams();
  const _location = useLocation();
  const isIconPage = _location.pathname.split('/')[1] === 'icon';
  const { style, search } = useParams();
  const tags = searchParams.get('tags');
  const styleset = replaceHyphensWithSpaces(searchParams.get('s'));
  const cat = searchParams.get('cat');
  const type = searchParams.get('t');
  const q = from === "dictionary" ? search : searchParams.get('search');
  const p = searchParams.get('p') || 1;
  const [backupUrl, setBackupUrl] = useState(search);
  const [label, setLabel] = useState(search)
  const [mobileSideBar, setMobileSideBar] = useState(false);
  const [menuOpenState, setMenuOpenState] = useState(true);
  const [selectedPage, setSelectedPage] = useState(Number(p) - 1);
  const [mobileMenuOpenState, setMobileMenuOpenState] = useState(true);
  const [productLoading, setProductLoading] = useState(false);
  const [iconStyleSet, setIconStyleSet] = useState(styleset)
  const { UseProductGet } = useProduct();
  const [getAllProd, setGetAllProd] = useState([]);
  const [selectedType, setSelectedType] = useState(type || "Classic");
  const [currentCate, setCurrentCat] = useState(cat ? cat.split(',') : []);
  const [detailViewOpen, setDetailViewOpen] = useState(false);
  const [isBucket, setBucket] = useState(false);
  const [selectedStyleSet, setSelectedStyleSet] = useState(
    style?.split("-").join(" ")
  );
  const { ModalMain, setIsLoginOpen } = Modal();
  /*-----bucket ------*/
  const [bucketPopUp, setBucketPopUp] = useToggle(false);
  const [bucketEditPopup, setBucketEditPopup] = useToggle(false);
  const [editBucketData, setEditBucketData] = useState();
  const [selectedBucket, setSelectedBucket] = useState();
  const [selectedBucketId, setSelectedBucketId] = useState();
  const [favBucketCount, setFavBucketCount] = useState(0);
  const { UseBucketList, UseDeleteBucket, UseGetBucketIcon, UseGetBucketIconFav, UseDeleteBucketIcon } = UseBucket();
  const Userid = JSON.parse(localStorage.getItem("user"))
  const [bucketData, setBucketData] = useState([])
  const getAllBucketData = async () => {
    if (!isEmpty(Userid)) {
      const response = await UseBucketList({
        id: Userid.id ? Userid.id : Userid._id
      })
      if (response && typeof response == 'object') {
        setBucketData(response)

      }
      setBucketData([])
    }
  }
  const hadnleOnDelete = async (id) => {
    const data = await UseDeleteBucket({
      id: id
    })
    if (data == 'Bucket deleted successfully.') {
      notifySuccess(data)
    }
    const response = await UseBucketList({
      id: Userid.id ? Userid.id : Userid._id
    })
    setBucketData(response)
    getAllBucketIconFav()
  };
  const [bucketIcons, setBucketIcons] = useState([])
  const getAllBucketIcon = async (bucketId) => {
    if (!bucketId) {
      await getAllBucketIconFav()
    } else {
      const data = await UseGetBucketIcon({
        userId: Userid.id ? Userid.id : Userid._id,
        bucketId: bucketId
      })
      setSelectedBucket(bucketData?.find(_b => _b.id == bucketId).bucketName)
      setSelectedBucketId(bucketId)
      if (data && typeof data == 'object') {
        setBucketIcons(data)

      } else {
        setBucketIcons([])
      }
    }
  }
  const getAllBucketIconFav = async () => {
    if (!isEmpty(Userid)) {
      const data = await UseGetBucketIconFav({
        userId: Userid.id ? Userid.id : Userid._id,
      })
      setSelectedBucketId(null)
      console.log(">>>>Bucket Data>>>>", data);
      setSelectedBucket('Favorite')
      if (data && typeof data == 'object') {
        setFavBucketCount(data?.length || 0)
        setBucketIcons(data)
      } else {
        setFavBucketCount(0)
        setBucketIcons([])
      }
    }
  }
  const deleteBucketIcon = async (id) => {
    const data = await UseDeleteBucketIcon({
      userId: Userid._id ? Userid._id : Userid.id,
      bucketId: selectedBucketId,
      productVariantId: id
    })
    notifySuccess(data)
    if (selectedBucket == "null" || selectedBucket == null) {
      getAllBucketIconFav()
    } else {
      getAllBucketIcon()
    }
  }
  useEffect(() => {
    getAllBucketData()
  }, [])

  useEffect(() => {
    getAllBucketIconFav()
  }, [])
  const handleBucketChange = () => {
    setBucket(true)
    getAllBucketIconFav()
    getAllBucketData()
  }
  /*-----------------bucket-------------------------*/
  const handleChangeType = (v) => {
    setBucket(false)
    searchParams.delete('p')
    if (v.toLowerCase() === 'brand') {
      searchParams.delete('cat')
      searchParams.delete('t')
      searchParams.append('t', v)
      navigator(`/icons`)
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
    searchParams.delete('p')
    navigator(`/icons/${replaceSpacesWithHyphens(v)}?${searchParams.toString()}`)
    setSelectedStyleSet(v)
  }
  const handleSelectCategory = (v) => {
    searchParams.delete('cat')
    searchParams.delete('p')
    if (currentCate?.includes(v)) {
      const _cat = currentCate?.filter(_c => _c != v)
      setCurrentCat(_cat);
      searchParams.append('cat', _cat.join(','))
    } else {
      const _cat = [...currentCate, v]
      setCurrentCat(_cat);
      searchParams.append('cat', _cat.join(','))
    }
    setSearchParams(searchParams)
  }
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const compare = (a, b) => {
    var leva = levenshtein(a.label, q || '').distance;
    var levb = levenshtein(b.label, q || '').distance;
    return leva - levb;
  }
  const getIcons = async (page) => {

    const data = {
      type: selectedType,
      search: !q ? "null" : q,
      styleSet: selectedStyleSet == undefined ? "null" : selectedStyleSet,
      category: currentCate?.length == 0 ? "null" : currentCate?.join(',')
    };
    if (page) {
      data['page'] = page
    } else {
      data['page'] = p || 1
    }
    setProductLoading(true);
    const getData = await UseProductGet(data);
    setGetAllProd(getData);
    setProductLoading(false);
  };
  const resetFilter = () => {
    searchParams.delete('p')
    navigator(`/icons`)
    setSelectedStyleSet('all')
    setMobileSideBar(false)
  }
  const nextPages = () => {
    if (getAllProd?.currentPage + 1 <= getAllProd?.totalPages) {
      searchParams.delete('p')
      getIcons(getAllProd?.currentPage + 1);
      searchParams.append('p', getAllProd?.currentPage + 1)
      setSearchParams(searchParams)
    }
  }
  const previousPage = () => {
    if (getAllProd?.currentPage - 1 >= 1) {
      searchParams.delete('p')
      getIcons(getAllProd?.currentPage - 1);
      searchParams.append('p', getAllProd?.currentPage - 1)
      setSearchParams(searchParams)
    }
  }
  const handlePageClick = (e) => {
    searchParams.delete('p')

    getIcons(Number(e.selected + 1));
    searchParams.append('p', Number(e.selected + 1))
    setSearchParams(searchParams)
    setSelectedPage(e.selected)
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedType(type || "Classic")
    setSelectedStyleSet(style)
  }, [type, style])

  useEffect(() => {
    getIcons();
    const _p = searchParams.get('p') || 1;
    setSelectedPage(Number(_p) - 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCate, selectedType, selectedStyleSet, search, q]);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      //setPlanName(localStorage.getItem("plan"));
      //const user = JSON.parse(localStorage.getItem("user"));
      setUserAuthenticated(true);
    } else {
      setUserAuthenticated(false);
    }
  }, [auth]);
  console.log("styleset", styleset)

  let _products = isBucket ? bucketIcons || [] : getAllProd?.products || []
  if (q != '' && q != 'null') {
    console.log('products', _products)
    console.log('q', q)
    _products = matchSorter(_products || [], q || '', { keys: ['label', 'tags'] });
  }
  return (
    <div>
      {isIconPage && <Helmet>
        <meta name="description" content={`${label} icon in the ${iconStyleSet} style. Best match with your design style. Available at openstroke icons now | The only atomic icon design system.`} />
        <title>{`${label} ${selectedType} ${iconStyleSet} Icon | Openstrokeicons.com`}</title>
        <meta property="og:title" content={`${label} ${selectedType} ${iconStyleSet} Icon | Openstrokeicons.com`} />
        <meta property="og:description"
          content={`${label} icon in the ${iconStyleSet} style. Best match with your design style. Available at openstroke icons now | The only atomic icon design system.`} />
        <meta property="og:image" content={`https://openstroke-api-hgsvh.ondigitalocean.app/media/social/${label}?t=${selectedType}&s=${iconStyleSet}`} />
      </Helmet>}
      <div className="search-result-root">
        <div className="landingPage-header profile-page-header newSearchResult">
          <div className="landingPage-Container">
            <LandingPageHeader
              menuOpenState={menuOpenState}
              setMenuOpenState={setMenuOpenState}
              mobileMenuOpenState={mobileMenuOpenState}
              setMobileMenuOpenState={setMobileMenuOpenState}
            />
          </div>
        </div>
        <div className="search-icon-deail-top">
          {!isIconPage && <div className="search-icon-detail-inner">
            <div className="seach-icon-link">
              <SearchBar
                placeholder="Search..."
                isHeader
                defaultValue={q}
              ></SearchBar>
              <div className="frame-37494" onClick={() => setMobileSideBar(!mobileSideBar)}>
                <svg
                  className="f"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23.3333 21.6667L31.5599 7.50379C32.2053 6.39268 31.4037 5 30.1188 5H9.34009C8.03412 5 7.23554 6.43383 7.92312 7.54414L16.5438 21.465C16.6254 21.5968 16.6687 21.7488 16.6686 21.9039L16.6666 33.3333L23.3333 31.3889V21.6667ZM23.3333 21.6667L23.3353 21.6667"
                    stroke="#1E3050"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.6666 21.6665H23.3333"
                    stroke="#1E3050"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>}
          {isIconPage ? (
            <DetailView
              full
              bucketData={bucketData}
              isUserAuthenticated={isUserAuthenticated}
              label={label}
              tags={tags}
              setIsLoginOpen={setIsLoginOpen}
              iconStyleSet={iconStyleSet}
              setCurrentCat={setCurrentCat}
              defaultType={selectedType}
            />
          ) : (
            <TypeBar isUserAuthenticated={isUserAuthenticated} isBucket={isBucket} setBucket={handleBucketChange} selectedType={selectedType} onSelectType={handleChangeType} />
          )}
        </div>
        <div className="search-icon-detail-bottom">
          {!isIconPage && selectedType.toLowerCase() !== 'brand' && <div className={mobileSideBar ? "mobileSideBar" : "search-icon-detail-left"}>
            {mobileSideBar && <div className="mobileSideBar-buttons">
              <div className="mobileSideBar-button" onClick={() => resetFilter()}>
                <div className="mobileSideBar-button2">Reset </div>
              </div>
              <div className="mobileSideBar-button3" onClick={() => setMobileSideBar(false)}>
                <div className="mobileSideBar-button4">Apply </div>
              </div>
            </div>}
            <ProductSidebar
              mobileSideBar={mobileSideBar}
              favBucketCount={favBucketCount}
              setBucketPopUp={setBucketPopUp}
              getAllBucketIcon={getAllBucketIcon}
              isBucket={isBucket}
              bucketData={bucketData}
              selectedCategory={currentCate}
              selectedStyleSet={selectedStyleSet}
              search={q}
              type={selectedType}
              onSelectCategory={handleSelectCategory}
              onSelectStyleSet={handleChangeStyleSet}
            ></ProductSidebar>
          </div>}

          {!mobileSideBar && <div className="search-icon-detail-inner" style={{ alignItems: 'flex-start' }}>
            {isBucket && <div class="PaginationBar">
              <div class="_23-icons-result">{selectedBucket}</div>
              {selectedBucket != "Favorite" &&
                <Popover
                  isOpen={bucketEditPopup}
                  positions={["bottom"]}
                  padding={10}
                  onClickOutside={() => setBucketEditPopup(false)}
                  content={
                    <div className="popover-dropdown-list">
                      <div className="popover-body-oneline" onClick={() => {
                        setEditBucketData({ bucketName: selectedBucket, editIndex: selectedBucketId });
                        setBucketPopUp(true);
                      }}>
                        <div className="popover-text">Edit </div>
                      </div>
                      <div className="popover-body-oneline" onClick={() => hadnleOnDelete(selectedBucketId)}>
                        <div className="popover-text">Delete </div>
                      </div>
                    </div>
                  }
                >
                  <svg onClick={() => setBucketEditPopup(true)} className="svg-btn" xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                    <path d="M19.1999 14.9001C17.8744 14.9001 16.7999 13.8256 16.7999 12.5001C16.7999 11.1746 17.8744 10.1001 19.1999 10.1001C20.5254 10.1001 21.5999 11.1746 21.5999 12.5001C21.5999 13.8256 20.5254 14.9001 19.1999 14.9001Z" fill="#676F7E" />
                    <path d="M11.9999 14.9001C10.6744 14.9001 9.5999 13.8256 9.5999 12.5001C9.5999 11.1746 10.6744 10.1001 11.9999 10.1001C13.3254 10.1001 14.3999 11.1746 14.3999 12.5001C14.3999 13.8256 13.3254 14.9001 11.9999 14.9001Z" fill="#676F7E" />
                    <path d="M4.7999 14.9001C3.47442 14.9001 2.3999 13.8256 2.3999 12.5001C2.3999 11.1746 3.47442 10.1001 4.7999 10.1001C6.12539 10.1001 7.1999 11.1746 7.1999 12.5001C7.1999 13.8256 6.12539 14.9001 4.7999 14.9001Z" fill="#676F7E" />
                  </svg>
                </Popover>

              }
            </div>}
            {isIconPage && <div class="_23-icons-result" style={{ width: '100%' }}>More Icons Like {search}</div>}
            {!isIconPage && !isBucket && <PaginationBar search={q} nextPages={nextPages} previousPage={previousPage} totalCount={getAllProd?.totalCount} removeTag={handleSelectCategory} totalPages={getAllProd?.totalPages} currentPages={getAllProd?.currentPage} tags={currentCate}></PaginationBar>}
            {productLoading ? (
              <div class="loader">
                <Spinner></Spinner>
              </div>
            ) : (
              ""
            )}
            {(!_products || _products?.length == 0) && !productLoading && <NoIconComponent></NoIconComponent>}
            <div className={_products?.length > 5 ? "icons-detail-grid" : "icons-detail-grid small"}>
              {_products?.length > 0 ? (
                _products?.sort(compare)?.map((obj, index) => {
                  return (
                    <div
                      className="icon-deatil-item"
                      onClick={() => {
                        navigator(`/icons/${replaceSpacesWithHyphens(obj.label)}?t=${selectedType}&s=${obj.styleSet}`)
                        setIconStyleSet(obj.styleSet)
                        setLabel(obj.label);
                        setBucket(false)
                        scrollTop();
                      }}
                    >
                      {isBucket && <svg onClick={(e) => { e.stopPropagation(); deleteBucketIcon(obj?._id) }} className="icon-delete-badge" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M8 4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4H20H22V6H20V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V6H2V4H4H8ZM11 8V18H9V8H11ZM13 8V18H15V8H13Z" fill="#ffff" />
                      </svg>}
                      {obj?.paid == 1 && <svg
                        className="premium-badge"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.71191 14.23L6.71191 5.77002L10.3839 5.77002C11.3119 5.77002 12.0279 6.00202 12.5319 6.46602C13.0359 6.93002 13.2879 7.57802 13.2879 8.41002C13.2879 9.24202 13.0359 9.89402 12.5319 10.366C12.0279 10.83 11.3119 11.062 10.3839 11.062H8.24791L8.24791 14.23H6.71191ZM8.24791 9.85002H10.1439C11.2479 9.85002 11.7999 9.37002 11.7999 8.41002C11.7999 7.45802 11.2479 6.98202 10.1439 6.98202H8.24791V9.85002Z"
                          fill="#FAD338"
                        />
                        <rect
                          x="1"
                          y="1"
                          width="18"
                          height="18"
                          rx="9"
                          stroke="#FAD338"
                          strokeWidth="2"
                        />
                      </svg>}
                      <img style={obj?.paid != 1 ? { marginTop: '16px' } : {}} src={(obj.previewUrl).replace('prod2/prod2', 'prod2')} alt="icon" />
                      <p>{obj.label}</p>
                    </div>
                  );
                })
              ) : <></>
              }
            </div>
            {!isBucket && getAllProd?.totalPages > 1 ? <ReactPaginate
              forcePage={selectedPage}
              containerClassName="pagination"
              breakLabel="..."
              nextLabel={<div className="pagination_btn"><span>Next</span><svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                <path d="M7.5 4L13.5 10.5L7.5 17" stroke="#7238FA" stroke-width="2" />
              </svg></div>}
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={getAllProd?.totalPages}
              previousLabel={<div className="pagination_btn"><svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                <path d="M13.5 4L7.5 10.5L13.5 17" stroke="#7238FA" stroke-width="2" />
              </svg><span>Prev</span></div>}
              renderOnZeroPageCount={null}
            /> : <></>}
          </div>}
        </div>
      </div>
     
      {ModalMain()}
      {/* <ResponsiveModal
        className="icon_modal"
        isOpen={detailViewOpen}
        onClose={() => {
          console.log('backupUrl', backupUrl)
          window.history.pushState({}, null, backupUrl)
          setDetailViewOpen(false)
        }
        }
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
      /> */}
      <ResponsiveModal
        isOpen={bucketPopUp}
        onClose={setBucketPopUp}
        closeOnOverlayClick={false}
        component={
          <BucketDialog
            setSelectedBucket={setSelectedBucket}
            onClose={setBucketPopUp}
            setBucketData={setBucketData}
            editBucketData={editBucketData}
            setEditBucketData={setEditBucketData}
          />
        }
      />
    </div >
  );
}
