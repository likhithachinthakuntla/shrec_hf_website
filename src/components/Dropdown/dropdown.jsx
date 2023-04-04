import React, { Component } from 'react';

import Select, { components } from 'react-select';

export default ({ placeholder, options, labelKey, valueKey, value }) => {
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
      backgroundColor: '#102123',
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
      color: 'white',
      height: '30px',
      display: 'flex',
      justifyContent: 'center',
    }),
    valueContainer: (base) => ({
      ...base,
      fontSize: '15px',
      top: '3.5px',
      marginLeft: '4px',
      overflow: 'visible',
    }),
    placeholder: (base, defaultStyles) => ({
      ...base,
      ...defaultStyles,
      minWidth: 200,
      maxWidth: 300,
      textAlign: 'left',
      fontStyle: 'italic',
      marginBottom: '65px',
      position: 'absolute',
      // color: 'black',
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
        components={{ ValueContainer: CustomValueContainer }}
      />
    </>
  );
};
