const blogContainer = document.querySelector(".blog-container");
const loader = document.querySelector(".post-loader");
const checkboxContainer = document.querySelectorAll(".checkbox-span");
const checkbox = document.querySelectorAll("#checkbox");

// Add an event listener to every checkbox
checkboxContainer.forEach((checkbox, index) => {
  checkbox.addEventListener("change", (e) => {
    // check if the user clicks the checkbox
    if (e.target.checked) {
      // Get todays date
      let today = new Date();
      let date = `${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`;
      // Add the date one the clicked item
      const listItem = checkboxContainer.item(index);
      // I am using .item(index) because querySelectorAll returns a node list
      listItem.innerHTML = `Completed: ${date}`;
    }
  });
});

// Create Blog cards
const createBlog = (params) => {
  // Stop the loader
  loader.innerHTML = "";
  // Create Outer link
  const blog = document.createElement("a");
  blog.href = params.url;
  blog.target = "_blank";

  // Make Blog Div
  const blogDiv = document.createElement("div");
  blogDiv.className = "blog";
  blog.appendChild(blogDiv);

  // Make Blog Title
  const blogTitle = document.createElement("h2");
  blogTitle.className = "blog__title";
  blogTitle.innerHTML = params.title;
  blogDiv.appendChild(blogTitle);

  // Add blog Date
  const blogDate = document.createElement("h4");
  blogDate.className = "blog__date";
  blogDate.innerHTML = params.date;
  blogDiv.appendChild(blogDate);

  // Add description
  const blogDesc = document.createElement("p");
  blogDesc.className = "blog__desc";
  blogDesc.innerHTML = params.description;
  blogDiv.appendChild(blogDesc);

  //Blog tag div
  const tagContainer = document.createElement("div");
  tagContainer.className = "ui-tag__wrapper tags";
  blogDiv.appendChild(tagContainer);

  // Add the tags
  const tags = params.tagsArray;
  tags.forEach((tag) => {
    const tagWrapper = document.createElement("div");
    tagWrapper.className = "ui-tag";
    tagContainer.appendChild(tagWrapper);
    const Tag = document.createElement("span");
    Tag.className = "tag-title";
    Tag.innerHTML = tag;
    tagWrapper.appendChild(Tag);
  });

  // Add to Document
  blogContainer.appendChild(blog);
};

// Get data from the API

const getBlogPosts = async () => {
  try {
    const response = await fetch(
      "https://dev.to/api/articles?username=merichard123"
    );
    const data = await response.json();

    // Loop over each item in the data array and make a card for each
    data.forEach((post) => {
      // Get the list of tags and keep only the first 2
      let tags = post.tag_list.slice(0, 2);

      // create an object for the create blog function parameters
      const parameters = {
        url: post.url,
        title: post.title,
        date: post.readable_publish_date,
        description: post.description,
        tagsArray: tags,
      };
      // Call the create blog with the parameters
      createBlog(parameters);
    });
  } catch (error) {
    // Display an error if something goes wrong.
    loader.innerHTML = "Something went wrong couldn't load posts...";
  }
};
getBlogPosts();

// Using the Fetch API equivalent
// Fetch returns a promise so it looks nicer to use async await
/*
fetch("https://dev.to/api/articles?username=merichard123")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((post) => {
      let tags = post.tag_list.slice(0, 2);
      const parameters = {
        url: post.url,
        title: post.title,
        date: post.readable_publish_date,
        description: post.description,
        tagsArray: tags,
      };

      createBlog(parameters);
    });
  })
  .catch((err) => {
    loader.innerHTML = "Something went wrong couldn't load posts...";
  });
*/
