export const getLabelFromEnum = (statusId?: number | null, arrayOptions: any[] = []) => {
  if (!statusId || !arrayOptions || arrayOptions.length === 0) {
    return null;
  }

  for (const item of arrayOptions) {
    if (item.id === statusId) {
      return item.label;
    }
  }

  return null;
};

export const sleep = async (second = 10) => {
  return new Promise((r) => setTimeout(r, second * 1000));
};

export const resetStoreCofirmPage = (routerNames: any[], stores: any[]) => {
  if (!routerNames.includes(window.jmPreviousRouteName)) {
    stores.forEach((i) => {
      i.$reset();
    });
  }
};

export const getNumberFilter = (obj?: any) => {
  let count = 0;
  for (const key in obj) {
    if (obj[key] !== null && obj[key] !== undefined && obj[key] !== '') {
      if (Array.isArray(obj[key]) && obj[key].length > 0) {
        count++;
      } else if (!Array.isArray(obj[key])) {
        count++;
      }
    }
  }

  return count;
};
