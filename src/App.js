import React, { useEffect, useState } from "react";
import axios from "axios";
import api from './api';

function App() {
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        //성공한 경우 처리
        console.log("응답 완료");
        setPosts(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        //실패한 경우 처리
        console.error("에러: ", err);
      });
  };
  useEffect(() => {
    getPosts();
  }, []);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  let userId = 1;

  const writePost = async () => {
    const data = {
      title: title,
      body: content,
      userId: userId,
    };
    try {
      const response = await api.post('/posts', data);
      console.log("응답 완료", response);
      setPosts([...posts, response.data]);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("에러 : ", error);
    }
  };

  const updatePost = async () => {
    const data = {
      id: 100,
      title: title,
      body: content,
      userId: 10,
    };
    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/100`,
        data
      );
      console.log("수정 완료", response);
      //getPosts();
      setPosts(posts.map((post) => (post.id === 100 ? response.data : post)));
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("에러 : ", error);
    }
  };

  const deletePost = async () => {
    try {
        const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/100`);
        console.log('삭제 완료', response);
        // getPosts();
        setPosts(posts.filter(post => post.id !== 101));
    } catch (error) {
        console.error('에러 : ', error);
    }
}

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h5>제목: {post.title}</h5>
          <p>내용: {post.body}</p>
        </div>
      ))}
      <input
        type="text"
        value={title} //제목 받음
        onChange={(e) => setTitle(e.target.value)} //setTitle을 통해 위 함수 writePost의 title 바꿈
        placeholder="제목"
      />
      <input
        type="text"
        value={content} //내용 받음
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용"
      />
      <button onClick={writePost}>작성</button>
      <button onClick={updatePost}>수정</button>
      <button onClick={deletePost}>삭제</button>
    </div>
  );
}

export default App;
