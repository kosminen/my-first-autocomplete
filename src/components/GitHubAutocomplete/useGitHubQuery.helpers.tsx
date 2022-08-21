export const mapQueriedItems = (items: Array<any>) => {
  return items.map((item) => {
    // Detect a user.
    if (item.login && item.html_url) {
      return {
        id: item.id,
        label: item.login,
        additionalInfo: "User",
        url: item.html_url,
      };
    }

    // Detect a repository.
    if (item.branches_url && item.name && item.html_url) {
      return {
        id: item.id,
        label: item.name,
        additionalInfo: "Repository",
        url: item.html_url,
      };
    }
  });
};
