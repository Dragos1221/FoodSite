import React, { Component } from 'react';
import NavBar from '../components/NavBar'
import {Container, Typography , TextField , Grid , Card , CardMedia , Button} from "@material-ui/core"
import { makeStyles  } from '@material-ui/core/styles';
import ServiceApi from "../service";
const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
    inputs:{
        marginLeft: theme.spacing(20)
    }
  }));

class RecipesByNutrients extends Component {
    state={
        params:{
            minProtein:0,
            maxProtein:10
        },
        data:[],
    }
    serviceApi = new ServiceApi();
    constructor(props)
    {
        super(props);
        this.state={
            params:{
                minProtein:0,
                maxProtein:10
            },
            data:[],
        }
    }

    componentDidMount(){
       console.log(this.fetchData());
    }

    fetchData = async ()=>{
        const data = await this.serviceApi.recipesByNutrient(this.state.params);
        this.setState({
            data:data,
        })
    }

    changeData = (type) => (event)=>{
        this.setState({
            [type]:event.target.value
        })
        this.fetchData();
    }
    render() { 
        const classes = this.props.classes;
        return (
        <div>
            <NavBar></NavBar>
            <div className={classes.heroContent}>
            <Container maxWidth="sm">
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Retete pentru campioni
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" paragraph>
                    Pe aceasta pagina veti putea sa cautati retete in functie de nevoile Dumneavoasta calorice.
                </Typography>
                <TextField className={classes.inputs}
                    label="nimProtein" 
                    color="secondary" 
                    type="number" 
                    value={this.state.params.minProtein}  
                    onChange={this.changeData("minProtein")}/>
                <TextField className={classes.inputs}
                    label="maxProtein" 
                    color="secondary" 
                    type="number" 
                    value={this.state.params.maxProtein}  
                    onChange={this.changeData("maxProtein")}/>
            </Container>
                <Grid container={true} >
                    {   
                        this.state.data.map((elem)=>{
                            console.log(elem);
                            <Grid item={true} key={elem}>
                            <Button variant="outlined" color="primary">
                                Secondary action
                            </Button>
                        </Grid>
                        }) 
                    }
                </Grid>
            </div>
        </div>  );
    }
}
 
export default () => {
    const classes = useStyles();
    return (
        <RecipesByNutrients classes={classes} />
    )
}