let packageTitle;

export const sortData = (
  allPackagesData,
  setAllPackagesData,
  sortProp,
  sortOrder
) => {
  if (sortProp === "price" && sortOrder === "ascending") {
    setAllPackagesData([...allPackagesData].sort((a, b) => a.price - b.price));
  } else if (sortProp === "price" && sortOrder === "descending") {
    setAllPackagesData([...allPackagesData].sort((a, b) => b.price - a.price));
  } else if (sortProp === "name" && sortOrder === "ascending") {
    setAllPackagesData(
      [...allPackagesData].sort((a, b) =>
        a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1
      )
    );
  } else if (sortProp === "name" && sortOrder === "descending") {
    setAllPackagesData(
      [...allPackagesData].sort((a, b) =>
        a.title.toUpperCase() > b.title.toUpperCase() ? -1 : 1
      )
    );
  }
};
