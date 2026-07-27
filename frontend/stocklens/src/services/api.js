 const API = "http://localhost:8000"
  
  export async function getCompanies(){
    const res = await fetch(`${API}/companies`);
    return res.json();
  }
  
  export async function getRecommendations(symbol){
    const res = await fetch(`${API}/companies/${symbol}/recommendations`);
    return res.json();
  }
  
  export async function getSummary(symbol){
    const res = await fetch(`${API}/companies/${symbol}/summary`);
    return res.json();
  }