import React, { useState, useCallback, useEffect, useRef } from 'react';
import UseItem from './UseItem';

import {getAttCoupons} from '../../services/get.js';

const UseItemList = () => {
    return (
        <div>
            <UseItem />
            <UseItem />
            <UseItem />
        </div>
    );
};

export default UseItemList;