import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../../components/Spinner/Spinner";
import Swal from "sweetalert2";
import {
  useGetSubCategoryQuery,
  useUpdateSubCategoryMutation,
} from "../../../../Redux/subCategory/subCategoryApi";

export default function EditSubCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetSubCategoryQuery(id);
  const [updateSubCategory, { isLoading: updateLoading }] =
    useUpdateSubCategoryMutation();

  if (isLoading) {
    return <Spinner />;
  }

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;

    const result = await updateSubCategory({ id, name });
    if (result?.data?.success) {
      Swal.fire("", "Update Success", "success");
      navigate("/admin/category/sub-categories");
    } else {
      Swal.fire("", "Somethin went worng", "error");
    }
  };

  return (
    <form
      onSubmit={handleUpdateCategory}
      className="p-4 bg-base-100 shadhow rounded sm:w-1/2"
    >
      <div className="form_group mt-2">
        <p>Sub Category Name</p>
        <input
          type="text"
          name="name"
          defaultValue={data?.data?.name}
          required
        />
      </div>

      <div className="mt-4">
        <button
          className="bg-primary text-base-100 px-6 py-1.5 rounded"
          disabled={updateLoading && "disabled"}
        >
          {updateLoading ? "Loading.." : "Update"}
        </button>
      </div>
    </form>
  );
}
