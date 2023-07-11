import { React, useEffect, useState } from "react";
import Menu from "../UserMenu/Menu";
import "./style.scss";
import AddNewUser from "../AddNewUser/AddNewUser";
import EditUser from "../EditUser/EditUser";
import DeleteUser from "../DeleteUser/DeleteUser";
import { getUser } from "../../redux/actions/addUserAction";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../Loading/LoadingScreen";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import Pagination from "../Pagination/Pagination";
import store from "../../redux/store";
import Nodata from "../Nodata/Nodata";

let PageSize = 10;

const User = () => {
  const [addPop, setAddPop] = useState(false);
  const [editPop, setEditPop] = useState(false);
  const [delPop, setDelPop] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editable, setEditable] = useState("");
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state) => state.userLogin);
  const { data, loading } = useSelector((state) => state.getUser);
  const firstPageIndex = currentPage > 0 ? (currentPage - 1) * PageSize : 0;
  const lastPageIndex = firstPageIndex + PageSize;
  const storeData = store.getState();
  const userType = storeData.userLogin.userDetails?.data.userDetails.userType;

  useEffect(() => {
    dispatch(getUser("Backend-user"));
  }, []);

  useEffect(() => {
    if (
      data &&
      data.data &&
      data.data.slice(firstPageIndex, lastPageIndex).length === 0
    ) {
    }
  }, [data]);
  return (
    <>
      {/* <LoadingScreen /> */}
      {loading && <LoadingScreen />}
      <div className="p-3 flex flex-col justify-between gap-4">
        <div className="p-4 bg-white item-center w-full border-b-2">
          <div className="w-full">
            <div>
              <div
                className={`tr-class sm:grid items-center text-[#8383A9] sm:grid-cols-4  gap-2 px-5`}
              >
                <p className="pr-3 hidden sm:block ">User Name</p>
                <p className="p-3 hidden sm:block">Email Address</p>
                <p className="p-3 hidden sm:block">Phone Number</p>
                {userType === "Admin" ? (
                  <div
                    className={`p-3 text-[#E75C54] flex items-center justify-center `}
                  >
                    <button
                      className="flex items-center text-[#E75C54] "
                      onClick={() => {
                        setAddPop(!addPop);
                      }}
                    >
                      <span>Add A New User</span>
                      <i className="ms-2 red-dot fa-solid fa-circle-plus"></i>
                    </button>
                  </div>
                ) : (
                  <span className="p-3 flex items-center justify-center">
                    Action
                  </span>
                )}
              </div>
            </div>

            <div>
              {data && data.data.length != 0 ? (
                data &&
                data.data
                  .toReversed()
                  .slice(firstPageIndex, lastPageIndex)
                  .map((val, index) => {
                    return (
                      <div
                        className={
                          `sm:grid items-start  ${"sm:grid-cols-4"} flex flex-col gap-2 sm:py-4 tr-class px-5 ` +
                          (index % 2 == 0 ? " bg-[#F5F9FF]" : "")
                        }
                        key={index}
                      >
                        <div className="td-class  flex justify-start gap-10  order-2 sm:order-1">
                          <div className="sm:hidden">
                            <PersonIcon />
                          </div>
                          <p className="flex gap-1 overflow-hidden truncate">
                            <span className="sm:hidden ">:</span>
                            <span className=" text-ellipsis font-bold overflow-hidden">
                              {val.userName}
                            </span>
                          </p>
                        </div>
                        <div className="td-class flex justify-start gap-10 order-3  sm:order-2">
                          <div className="sm:hidden">
                            <EmailIcon />
                          </div>
                          <p className="flex gap-1 overflow-hidden truncate">
                            <span className="sm:hidden ">:</span>
                            <span className="block w-[10rem] sm:w-full overflow-hidden truncate">
                              {val.email}
                            </span>
                          </p>
                        </div>
                        <div className="td-class flex justify-start gap-10 order-4  sm:order-3">
                          <div className="sm:hidden">
                            <PhoneIcon />
                          </div>
                          <p className="flex gap-1 overflow-hidden truncate">
                            <span className="sm:hidden">:</span>
                            <span className=" text-ellipsis overflow-hidden"></span>{" "}
                            {val.phone}
                          </p>
                        </div>
                        <div className="flex ms-2 w-full justify-end sm:justify-center order-1 sm:order-4 ">
                          {((userType === "Backend-user" &&
                            val._id === userDetails.data.userDetails._id) ||
                            userType === "Admin") && (
                            <Menu
                              editPop={editPop}
                              setEditPop={setEditPop}
                              setEditable={setEditable}
                              data={val}
                              delPop={delPop}
                              setDelPop={setDelPop}
                            />
                          )}
                        </div>
                      </div>
                    );
                  })
              ) : (
                <Nodata name="users" />
              )}
            </div>
          </div>
        </div>
        <div className="md:absolute md:bottom-16 ">
          {data && (
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={data && data?.data.length}
              pageSize={PageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />
          )}
        </div>
      </div>

      {addPop && <AddNewUser setAddPop={setAddPop} addPop={addPop} />}
      {editPop && (
        <EditUser editPop={editPop} setEditPop={setEditPop} data={editable} />
      )}
      {delPop && (
        <DeleteUser delPop={delPop} setDelPop={setDelPop} data={editable} />
      )}
    </>
  );
};

export default User;
