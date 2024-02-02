import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axiosInstance from "@/shared/helpers/axiosInstance";
import { useCallback, useEffect, useState } from "react";

type Props = {
  categoryId: string;
};

const ShowCategoriesDialog = ({ categoryId }: Props) => {
  const [categories, setCategories] = useState([]);

  const getCategoriesByChannelId = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `categories/categoriesByCategory/?categoryId=${categoryId}`
      );
      // console.log(response.data.categories);
      setCategories(response.data.categories);
    } catch (e) {
      console.error(e);
    }
  }, [categories]);

  const removeCategory = async (categoriesId: string) => {
    try {
      const response = await axiosInstance.patch(
        "categories/categoriess/remove-category/",
        {
          categoryId,
          categoriesId,
        }
      );
      console.log(response.data);
      setCategories((prevCategories: any) => {
        return prevCategories.filter(
          (categories: { categoriesId: string }) =>
            categories.categoriesId !== categoriesId
        );
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getCategoriesByChannelId();
  }, [getCategoriesByChannelId]);

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="ghost">View</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Categories</DialogTitle>
          <DialogDescription>
            <ul className="list-none space-y-2">
              {categories.map(
                (category: { categoryId: string; name: string }) => (
                  <li
                    key={category.categoryId}
                    className="p-2 text-gray-500  flex justify-between items-center"
                  >
                    <span>{category.name}</span>
                    <button
                      onClick={() => removeCategory(category.categoryId)}
                      className="bg-red-500 text-xs text-white rounded-full h-4 w-4 flex items-center justify-center"
                    >
                      X
                    </button>
                  </li>
                )
              )}
            </ul>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ShowCategoriesDialog;
