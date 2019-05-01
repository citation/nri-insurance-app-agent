import { CATEGORY_COLOR,CONNECTION_STATE_COLOR } from '../common/constant';

export default class color {
  static getCategoryColor = (category) => {
    const colors = CATEGORY_COLOR.filter((cc)=>{
      return cc.key === category
    });
    return colors.length? colors.shift().value: null;
  }

  static getConnectionStateColor = (state) => {
    const colors = CONNECTION_STATE_COLOR.filter((cc)=>{
      return cc.key === state
    });
    const result = (colors.length? colors.shift().value: null);
    return result;
  }
}
