function sleep(period = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, period);
  });
}
function getOffsetHeight(el) {
  return el.offsetHeight || 0;
}
function getShowData(sourceData, list, direction = "down", index, offsetHeight, initDataNum, scrollTop) {
  let _transformY;
  let _data;
  let _itemSeat = getReserveItemNum(list, scrollTop);
  switch (direction) {
    case "init":
      _data = getInnerIndex(list, index > 0 ? index - 1 : 0);
      _transformY = _data ? _data.transformY + _data.offsetHeight : 0;
      list.splice(index, 1, { ...sourceData[index], offsetHeight, transformY: _transformY });
      break;
    case "down":
      _data = getInnerIndex(list, index - 1);
      _transformY = _data ? _data.transformY + _data.offsetHeight : 0;
      list.push({ ...sourceData[index], offsetHeight, transformY: _transformY });
      if (_itemSeat.beforeItemNum >= initDataNum) {
        list.shift();
      }
      break;
    case "up":
      _data = getInnerIndex(list, index + 1);
      _transformY = _data ? _data.transformY - offsetHeight : 0;
      list.unshift({ ...sourceData[index], offsetHeight, transformY: _transformY });
      if (_itemSeat.afterItemNum >= initDataNum * 2) {
        list.pop();
      }
      break;
  }
}
function getInnerIndex(list, index) {
  for (let i = 0, len = list.length; i < len; i++) {
    if (list[i].index === index) {
      return list[i];
    }
  }
  return false;
}
function getScrollItemNum(list, distance, direction = "down") {
  let _calculatorItemHeight = 0;
  let _itemNum = 0;
  let _len = list.length;
  distance = Math.abs(distance);
  while (_calculatorItemHeight < distance) {
    if (direction === "down") {
      _calculatorItemHeight += list[_itemNum].offsetHeight;
    }
    if (direction === "up") {
      _calculatorItemHeight += list[_len - 1 - _itemNum].offsetHeight;
    }
    if (distance > _calculatorItemHeight) {
      _itemNum++;
    }
  }
  return _itemNum;
}
function getReserveItemNum(list, scrollTop) {
  let _beforeListLen = 0;
  let _afterListLen = 0;
  list.forEach((element, index) => {
    if (scrollTop >= list[index].transformY) {
      _beforeListLen += 1;
    } else {
      _afterListLen += 1;
    }
  });
  return {
    beforeItemNum: _beforeListLen,
    afterItemNum: _afterListLen
  };
}

export { getOffsetHeight, getReserveItemNum, getScrollItemNum, getShowData, sleep };
