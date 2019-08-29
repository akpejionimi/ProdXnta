import React from 'react'
import {
    // Input,
    InputGroupText,
    InputGroupAddon,
    InputGroup
} from 'reactstrap'
const SearchBox = ({ searchField, searchChange }) => {
    return (
        <div className="pa2">
        <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">
                <InputGroupText>
                    <i className="fa fa-search"></i>
                </InputGroupText>
            </InputGroupAddon>
            <input className="pa2 ba b--green bg-lightest-blue_"
                type="Search"
                placeholder="Search Customer"
                onChange={searchChange} />
        </InputGroup> 
        </div>
    )
}
export default SearchBox