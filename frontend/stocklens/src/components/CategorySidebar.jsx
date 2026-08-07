import '../styles/sidebar.css';

function CategorySidebar({ category, setCategory }){

    return (
         <div className="sidebar"> 
            <h2 className="sidebar-title">Category</h2>
            <div className="sidebar-content">
                <ul className="sidebar-list">
                        <li className={`sidebar-item ${category === 'BUY' ? 'selected' : ''}`} onClick={() => setCategory('BUY')}>
                            BUY
                        </li>
                        <li className={`sidebar-item ${category === 'SELL' ? 'selected' : ''}`} onClick={() => setCategory('SELL')}>
                            SELL
                        </li>
                        <li className={`sidebar-item ${category === 'HOLD' ? 'selected' : ''}`} onClick={() => setCategory('HOLD')}>
                            HOLD
                        </li>
                        <li className={`sidebar-item ${category === 'ACCUMULATE' ? 'selected' : ''}`} onClick={()=> setCategory('ACCUMULATE')}>
                            ACCUMULATE
                        </li>
                        </ul>
                    </div>
            </div>   
    )
}

export default CategorySidebar