import React, { Component } from 'react';

import Select, { components } from 'react-select';

export default ({ placeholder, options, labelKey, valueKey }) => {
  const { ValueContainer, Placeholder } = components;

  const CustomValueContainer = ({ children, ...props }) => {
    return (
      <ValueContainer {...props}>
        <Placeholder {...props} isFocused={props.isFocused}>
          {props.selectProps.placeholder}
        </Placeholder>
        {React.Children.map(children, (child) =>
          child && child.type !== Placeholder ? child : null
        )}
      </ValueContainer>
    );
  };

  const styles = {
    control: (defaultStyles) => ({
      ...defaultStyles,
      minWidth: 200,
      maxWidth: 300,
      // backgroundColor: "#102123",
    }),
    menu: ({ ...css }) => ({
      ...css,
      minWidth: 200,
      maxWidth: 300,
      // backgroundColor: "#102123",
    }),
    // Add padding to account for width of Indicators Container plus padding
    option: (defaultStyles) => ({
      ...defaultStyles,
      width: 'inherit',
      textAlign: 'left',
      // color: state.isSelected ? "#212529" : "#fff",
      // backgroundColor: state.isSelected ? "#a0a0a0" : "#212529",
    }),
    singleValue: (defaultStyles) => ({
      ...defaultStyles,
      color: 'black',
    }),
    placeholder: (defaultStyles) => ({
      ...defaultStyles,
      minWidth: 200,
      maxWidth: 300,
      textAlign: 'justify',
    }),
  };

  return (
    <>
      <Select
        className='basic-single'
        classNamePrefix='select'
        isLoading={false}
        isClearable={true}
        isSearchable={true}
        isDisabled={false}
        options={options}
        placeholder={placeholder}
        styles={styles}
        labelKey={labelKey}
        valueKey={valueKey}
        // components={{ValueContainer: CustomValueContainer}}
      />

      {/* <div
        style={{
          color: 'hsl(0, 0%, 40%)',
          display: 'inline-block',
          fontSize: 12,
          fontStyle: 'italic',
          marginTop: '1em',
        }}
      >
      </div> */}
    </>
  );
};
