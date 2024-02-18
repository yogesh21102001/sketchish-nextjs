import { useState } from "react";
import { CreateStyleSet,UpdateStyleSet, Typeall, TypeAdd, TypeUpdate, TypeDelete, Categoryall, CategoryAdd, CategoryUpdate, CategoryDelete, SubCategoryAdd, SubCategoryUpdate, SubCategoryDelete, Subcategoryall } from "../../common-apis/admin/admin";
import { notifyError } from "../../utils/notify";

export default function useAdmin() {

  const [isLoading, setLoading] = useState(false);
  const setStyleSetIcon = async ({
    title,
    description,
    paid,
    assets,
  }) => {
    try {
      setLoading(true);

      const formData = new FormData();

      if (assets && assets.length > 0) {
        for (const asset of assets) formData.append("assets", asset);
      }

      const docData = JSON.stringify(
        JSON.stringify({
          title,
          description,
          paid,
        })
      );

      formData.append("document", docData);

      const response = await CreateStyleSet(formData);

      setLoading(false);

      return response;
    } catch (e) {
      setLoading(false);
      return false;
    }
  };



   const UpdateStyleSetIcon = async ({
    title,
    styleSetId,
    description,
    paid,
    assets,
  }) => {
    try {
      setLoading(true);

      const formData = new FormData();

      if (assets && assets.length > 0) {
        for (const asset of assets) formData.append("assets", asset);
      }

      const docData = JSON.stringify(
        JSON.stringify({
          styleSetId,
          title,
          description,
          paid,
        })
      );

      formData.append("document", docData);

      const response = await UpdateStyleSet(formData);

      setLoading(false);

      return response;
    } catch (e) {
      setLoading(false);
      notifyError(e.message);
      return false;
    }
  };
  

  const GetStyleIcon = async () => {
    const url = `admin/style-set/get`
    const data = await Typeall(url);
    return data
  };  



  const TypeGetAll = async () => {
    const url = `admin/type-get-all`
    const data = await Typeall(url);
    return data
  };

  const CreateType = async ({ typeName }) => {

    const payload = {
      name: typeName
    };

    const response = await TypeAdd(payload);
    return response

  }

  const UpdateType = async (data) => {

    const payload = {
      typeId: data.typeId,
      name: data.typeName
    }

    const response = await TypeUpdate(payload);
    return response
  }

  const DelteType = async (typeId) => {

    const response = await TypeDelete(typeId);
    return response
  }

  const CategoryGetAll = async () => {
    const url = `admin/category-get-all`
    const data = await Categoryall(url);
    return data
  };

  const CreateCategory = async ({ categoryName }) => {

    const payload = {
      name: categoryName
    };

    const response = await CategoryAdd(payload);
    return response

  }

  const UpdateCategory = async (data) => {
    console.log("data", data);
    const payload = {
      categoryId: data.categoryId,
      name: data.categoryName
    }
    console.log(payload);
    const response = await CategoryUpdate(payload);
    return response
  }

  const DelteCategory = async (categoryId) => {
    console.log("categoryId", categoryId);
    const response = await CategoryDelete(categoryId);
    return response
  }


  const SubCategoryGetAll = async () => {
    const url = `admin/sub-category-get-all`
    const data = await Subcategoryall(url);
    return data
  };

  const SubCreateCategory = async ({ subCategoryName }) => {
    console.log("subCategoryName", subCategoryName);
    const payload = {
      name: subCategoryName
    };

    const response = await SubCategoryAdd(payload);
    return response

  }

  const SubUpdateCategory = async (data) => {
    console.log("data", data);
    const payload = {
      subCategoryId: data.subCategoryId,
      name: data.subCategoryName
    }
    console.log(payload);
    const response = await SubCategoryUpdate(payload);
    return response
  }

  const SubDelteCategory = async (subCategoryId) => {
    console.log("subCategoryId", subCategoryId);
    const response = await SubCategoryDelete(subCategoryId);
    return response
  }



  return { isLoading, setStyleSetIcon, UpdateStyleSetIcon, GetStyleIcon,TypeGetAll, CreateType, UpdateType, DelteType, CategoryGetAll, CreateCategory, UpdateCategory, DelteCategory, SubCategoryGetAll, SubCreateCategory, SubUpdateCategory, SubDelteCategory };
}
