import React from 'react';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';


const Filters = () => (
  <div>
    <div className="slider">
      <p>Discount, %</p>
      <Range min={0} max={100} defaultValue={[0, 100]} />
    </div>
    <div className="slider">
      <p>Monthly investment</p>
      <Range min={0} max={20000} defaultValue={[0, 20000]} />
    </div>
    <div className="slider">
      <p>Home value</p>
      <Range min={0} max={2000000} defaultValue={[0, 100000]} />
    </div>
  </div>
);

export default Filters;
