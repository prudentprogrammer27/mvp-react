import React, { useEffect, useState } from 'react';

const Input = () => {
    return (
        <form>
            <label for="inputBox">Enter a new task:</label>
            <input type="text" id="inputBox" name="inputBox"></input>
            <button type="submit">Submit</button>
        </form>
    );
}


export default Input;