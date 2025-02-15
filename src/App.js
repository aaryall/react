
import './App.css';
import { useState, useRef, useEffect, useReducer } from 'react';
// import BlogCart from './blog-cart';

function blogsReducer(state, action){
  switch(action.type){
    case "ADD":
      return [action.blog, ...state];
    case "REMOVE":
      return state.filter((blog,index)=> index !== action.ind);
    default:
      return [];
  }

}
function App() {
  //const [allContent, setAllContent] =  useState([]);
  const [formData, setformData] = useState({title:"", content:""});
  const [allContent, dispatch] = useReducer(blogsReducer, [])
  const titleRef = useRef(null);
  const handleRemove =(index)=>{
   
   //setAllContent(allContent.filter((blog,ind)=>ind !== index));
   dispatch({type:"REMOVE",ind: index});
  }
  useEffect(()=>{
    //When our page renders first time, work as mounting phase
    titleRef.current.focus();
  },[]);

  //When we click Post button , new blog will get added to allContent array, means whenever this array get changed we want to show top most
  //  blog title as a tab name
  useEffect(()=>{
    if(allContent.length){
      document.title = allContent[allContent.length -1].title;
    }
    else{
      document.title = "No Blogs !!"
    }
  },[allContent]);



  const handleSubmit=(e)=>{
    e.preventDefault();
    const newBlog = {
      title : formData.title,
      content : formData.content
    }
    //setAllContent([...allContent,newBlog]);
    dispatch({type: "ADD",blog:newBlog});
    setformData({title:"",content:""});
    titleRef.current.focus();
  }



  return (
    <>
      <div className="blog-form">
        <h2>Create New Blog Post</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label for="title">Title</label>
                <input type="text" id="title" placeholder="Enter blog title" value={formData.title} onChange={(e)=>setformData({title:e.target.value , content: formData.content})}
                ref = {titleRef}/>
            </div>
            <div className="form-group">
                <label for="content">Blog Content</label>
                <textarea id="content" placeholder="Write your blog content here" value={formData.content} onChange={(e)=>setformData({title: formData.title,content:e.target.value})}/>
            </div>
            <button type="submit" className="submit-btn">Post Blog</button>
        </form>
    </div>
   { allContent.length > 0  && allContent.map((blog,index) => (
                    <div key={index} className ="blog-card">
                        <h3>{blog.title}</h3>
                        <p>{blog.content}</p>
                        <button type="submit" className="submit-btn" onClick={()=> handleRemove(index)}>Remove</button>
                    </div>
                ))}

    </>
  );
}

export default App;
