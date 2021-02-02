import React, { Component } from 'react';
import axios from "axios";

class ServiceApi extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            ulr:"https://api.spoonacular.com/recipes/findByNutrients",
            key:"e3e2e5dd70464bc98b42bb439a9f12b0",
            instance : axios.create({
                baseURL: "https://api.spoonacular.com/recipes/findByNutrients",
                headers: {"Content-Type": "application/json"}
          })
        }
    }

    recipesByNutrient =  async (params)=>{
        try {
            const {data:response} = await axios({
                method: 'get',
                url: 'https://api.spoonacular.com/recipes/findByNutrients',
                params: {
                    apiKey: this.state.key,
                    ...params,
                }
          });
          console.log(response ,"d");
          return response;
        }catch(e)
        {
            console.log(e);
        }
    }
}
 
export default ServiceApi;