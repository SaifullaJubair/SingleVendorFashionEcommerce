import Select from "react-select";

const SingleSpecSelect = ({
  setSelectedSpecifications,
  specification,
  selectedSpecifications,
}) => {
  // Function to handle selecting a single value
  const handleSelectChange = (specId, specName, selectedOption) => {
    const selectedValue = {
      _id: selectedOption?._id,
      specification_value_name: selectedOption?.specification_value_name,
    };

    setSelectedSpecifications((prevState) => {
      const specIndex = prevState?.findIndex((spec) => spec?._id === specId);

      if (specIndex > -1) {
        // Specification exists, update the value
        const updatedSpec = {
          ...prevState[specIndex],
          specification_values: [selectedValue], // Only one value allowed
        };
        return [
          ...prevState.slice(0, specIndex),
          updatedSpec,
          ...prevState.slice(specIndex + 1),
        ];
      } else {
        // Specification doesn't exist, add it with the selected value
        return [
          ...prevState,
          {
            _id: specId,
            specification_name: specName,
            specification_values: [selectedValue], // Only one value allowed
          },
        ];
      }
    });
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {specification?.map((spec) => {
        // Find the selected specification for the current spec
        const selectedSpec = selectedSpecifications.find(
          (s) => s._id === spec._id
        );

        return (
          <div key={spec?._id}>
            <h3>{spec?.specification_name}</h3>
            <Select
              options={spec?.specification_values}
              getOptionLabel={(option) => option?.specification_value_name}
              getOptionValue={(option) => option?._id}
              isClearable
              onChange={(selectedOption) =>
                handleSelectChange(
                  spec?._id,
                  spec?.specification_name,
                  selectedOption
                )
              }
              placeholder={`Select ${spec?.specification_name}`}
              className="mb-3"
              value={
                selectedSpec?.specification_values?.length
                  ? {
                      _id: selectedSpec.specification_values[0]._id,
                      specification_value_name:
                        selectedSpec.specification_values[0]
                          .specification_value_name,
                    }
                  : null
              } // Set default value from selectedSpecifications
            />
          </div>
        );
      })}
    </div>
  );
};

export default SingleSpecSelect;
