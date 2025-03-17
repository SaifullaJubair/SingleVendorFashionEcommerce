import { divisions } from "@/data/divisions";
import Select from "react-select";
import PhoneInput, {
  formatPhoneNumber,
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";

const DeliveryInformation = ({
  register,
  userInfo,
  errors,
  setDivision,
  setDistrictId,
  setDistrict,
  setIsOpenDistrict,
  isOpenDistrict,
  districtsData,
  division,
  district,
  setUserPhoneLogin,
  customer_phone,
  setUserPhone
}) => {
  return (
    <div className="bg-white shadow-md    p-4">
      <div>
        <p className="text-xl mb-3">Delivery Information</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label htmlFor="" className="block text-xs font-medium text-gray-700">
            Name
          </label>

          <input
            {...register("customer_name")}
            type="text"
            value={userInfo?.data?.user_name}
            placeholder="Your Name"
            className="mt-2 w-full   border-gray-200 shadow-sm sm:text-sm p-2 border-2"
          />
          {errors.customer_name && (
            <p className="text-red-600 text-sm ml-2">
              {errors.customer_name?.message}
            </p>
          )}
        </div>
        <div className="">
          <label htmlFor="" className="block text-xs font-medium text-gray-700">
            Phone Number
          </label>

          {userInfo?.data?.user_phone ? (
            <div>
              <input
                {...register("customer_phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^(?:\+88|88)?(01[3-9]\d{8})$/,
                    message: "Invalid Bangladeshi phone number",
                  },
                })}
                onChange={() => setUserPhoneLogin(true)}
                type="number"
                defaultValue={userInfo?.data?.user_phone}
                placeholder="Your Phone"
                className="mt-2 w-full   border-gray-200 shadow-sm sm:text-sm p-2 border-2"
              />
              {errors.customer_phone && (
                <p className="text-red-600 text-sm ml-2">
                  {errors.customer_phone?.message}
                </p>
              )}
            </div>
          ) : (
            <PhoneInput
              className="custom-phone-input w-full   mt-2 border border-white-light bg-white px-4 py-2 text-sm text-black placeholder:text-white-dark"
              placeholder="Enter phone number"
              id="customer_phone"
              value={customer_phone}
              defaultCountry="BD"
              international
              countryCallingCodeEditable={false}
              countries={["BD"]}
              onChange={setUserPhone}
              error={
                customer_phone
                  ? !isValidPhoneNumber(customer_phone) &&
                    "Invalid phone number"
                  : "Phone number required"
              }
            />
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Division
          </label>
          <Select
            id="division"
            name="division"
            placeholder="Select a division"
            options={divisions}
            value={division ? { name: division } : null}
            getOptionLabel={(x) => x?.name}
            getOptionValue={(x) => x?.id}
            onChange={(selectedOption) => {
              setIsOpenDistrict(false);
              setDistrict();
              setDistrictId(selectedOption?.id);
              setDivision(selectedOption?.name);
              setTimeout(() => {
                setIsOpenDistrict(true);
              }, 100);
            }}
            menuPortalTarget={document.body}
            styles={{
              menuPortal: (base) => ({
                ...base,
                zIndex: 999,
              }), // Set a high z-index
            }}
          ></Select>
        </div>
        {isOpenDistrict && (
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              District
            </label>
            <Select
              id="district"
              name="district"
              aria-label="Select a district"
              placeholder="Select a district"
              options={districtsData}
              value={district ? { name: district } : null}
              getOptionLabel={(x) => x?.name}
              getOptionValue={(x) => x?.id}
              onChange={(selectedOption) => {
                setDistrict(selectedOption?.name);
              }}
              menuPortalTarget={document.body}
              styles={{
                menuPortal: (base) => ({
                  ...base,
                  zIndex: 999,
                }), // Set a high z-index
              }}
            ></Select>
          </div>
        )}
        <div className="">
          <label
            htmlFor="address"
            className="block text-xs font-medium text-gray-700"
          >
            Address
          </label>

          <input
            {...register("address", {
              required: "Fill the address",
            })}
            type="text"
            placeholder="Your Address"
            className="mt-2 w-full   border-gray-200 shadow-sm sm:text-sm p-2 border-2"
          />
          {errors.address && (
            <p className="text-red-600 text-sm ml-2">
              {errors.address?.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryInformation;
