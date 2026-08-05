 const API = "http://localhost:8000"
  
  export async function getCompanies(){
    const res = await fetch(`${API}/companies`);
    return res.json();
  }
  
  export async function getAllSummary(){
    const res = await fetch(`${API}/summary`);
    return res.json();
  }
  export async function getCards(){
    const res = await fetch(`${API}/cards`);
    return res.json();
  }

  export async function getBrokerSummary(){
    const res = await fetch(`${API}/brokers_summary`)
    return res.json()
  }

  export async function getCommonCompanies(broker_ids){
    const res = await fetch(`/broker/common/${broker_ids}`)
    return res.json()
  }