import React, { useEffect, useState } from 'react';

function BlogPost() {

  const [textContent, setTextContent] = useState('');

  useEffect(() => {
    const div = document.querySelector('#blog-post');
    if (div) {
      setTextContent(extractTextContentFromDiv(div));
    }
  }, []);

  useEffect(() => {
    if (textContent.length) {
      sendPostsToEndPoint(textContent);
    }
  }, [textContent]);

  function sendPostsToEndPoint(text) {
    const name = 'War in Ukraine';
    const data = { name: name, text: text };

    fetch("http://localhost:5000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function extractTextContentFromDiv(div) {
    let textContent = "";
    for (let i = 0; i < div.childNodes.length; i++) {
      const child = div.childNodes[i];
      if (child.nodeType === 1) {
        textContent += child.textContent;
      } else if (child.nodeType === 1 && child.tagName.toLowerCase() === 'div') {
        textContent += extractTextContentFromDiv(child);
      }
    }
    return textContent;
  }



  return (
    <div id="blog-post">
      <h1>The Ukrainian War</h1>
      <p>
        The Ukrainian war, also known as the Russo-Ukrainian War, is an ongoing conflict that began in 2014 between Ukraine and Russia. The conflict has been ongoing for several years and has resulted in the deaths of thousands of people, displacement of millions, and significant political and economic consequences.
      </p>
      <p>
        The conflict started after protests in Ukraine led to the ousting of pro-Russian President Viktor Yanukovych. Russia subsequently annexed Crimea from Ukraine, which was met with condemnation from the international community. In response, a separatist movement emerged in eastern Ukraine with support from Russia, leading to a military conflict between Ukraine and the separatists.
      </p>
      <p>
        The conflict has had significant political and economic consequences for Ukraine and Russia, as well as for the broader region. The war has strained the relationship between Russia and the West, leading to economic sanctions and diplomatic tensions. Ukraine has also been severely impacted, with significant economic and social challenges resulting from the conflict, including the displacement of millions of people and the destruction of infrastructure and property.
      </p>
      <p>
        International organizations and governments have condemned Russia's actions and have imposed economic sanctions on Russia in response to the annexation of Crimea and support for separatists in eastern Ukraine. The conflict continues to have significant political and economic consequences, with no clear resolution in sight.
      </p>

    </div>
  );
}

export default BlogPost;
