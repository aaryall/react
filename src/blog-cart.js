import './App.css';
export default function BlogCart({blogList}){
    const handleRemove = (index) =>{
        blogList = blogList.slice(index,2);
        
    }
    return(
        
        <>
            {
                
                blogList.map((blog,index) => (
                    <div key={index} className ="blog-card">
                        <h3>{blog.title}</h3>
                        <p>{blog.content}</p>
                        <button onClick={()=> handleRemove(index)}>Remove</button>
                    </div>
                ))
            }   
            
        </>
    );
}