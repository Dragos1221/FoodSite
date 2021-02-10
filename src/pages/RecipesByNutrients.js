import React, { Component } from 'react';
import NavBar from '../components/NavBar'
import {Container, Typography , TextField , Grid , Card , CardMedia , Button , CardContent ,CardActions} from "@material-ui/core"
import { makeStyles  } from '@material-ui/core/styles';
import ServiceApi from "../service";
import isEqual from 'lodash/isEqual'
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
    }, bg:{
    }
  }));

class RecipesByNutrients extends Component {
    serviceApi = new ServiceApi();
    constructor(props)
    {
        super(props);
        this.state={
            params:{
              minProtein:0,
              maxProtein:10,
              maxCarbs:10,
              minCarbs:0,
              minFat:0,
              maxFat:10,
              number:100,
              random:true
            },
            data:[]
        }
    }

    componentDidMount(){
      //console.log(this.fetchData());
    }

    componentDidUpdate(prevProps,prevState){
      if(!isEqual(this.state.params, prevState.params))
        {
          this.fetchData();
        }
    }

    fetchData = async ()=>{
        const data = await this.serviceApi.recipesByNutrient(this.state.params);
        this.setState({
            data:data,
        })
    }

    changeData = (type) => (event)=>{
        this.setState({
            params:{
                ...this.state.params,
                [type]:Number(event.target.value)
            }
        })
    }


    gridItem = (elem)=>{
        const classes = this.props.classes;
        return(
        <Grid  item={true} key={elem.title} xs={12} sm={6} md={4}>
            <Card className={classes.Card}>
            <CardMedia
                    className={classes.cardMedia}
                    image={elem.image}
                    title={elem.title}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                     {elem.title}
                    </Typography>
                    <Typography >
                      Calories:{elem.calories}
                    </Typography>
                  </CardContent>
                </Card>
        </Grid>
        )
    }
    render() { 
        const classes = this.props.classes;
        return (
        <div className={classes.bg}>
            <NavBar></NavBar>
            <div className={classes.heroContent}>
            <Container maxWidth="sm" className={classes.bg}>
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
                  <TextField className={classes.inputs}
                    label="minCarbs" 
                    color="secondary" 
                    type="number" 
                    value={this.state.params.minCarbs}  
                    onChange={this.changeData("minCarbs")}/>
                  <TextField className={classes.inputs}
                    label="maxCarbs" 
                    color="secondary" 
                    type="number" 
                    value={this.state.params.maxCarbs}  
                    onChange={this.changeData("maxCarbs")}/>
                    <TextField className={classes.inputs}
                    label="minFat" 
                    color="secondary" 
                    type="number" 
                    value={this.state.params.minFat}  
                    onChange={this.changeData("minFat")}/>
                  <TextField className={classes.inputs}
                    label="maxFat" 
                    color="secondary" 
                    type="number" 
                    value={this.state.params.maxFat}  
                    onChange={this.changeData("maxFat")}/>      
            </Container>
            <Container className={classes.cardGrid} >
            <Grid container direction="row" justify="center" alignItems="center" spacing={6}>
                    {   
                        this.state.data.map((elem)=>{
                            return this.gridItem(elem)
                        }) 
                    }
            </Grid>
            </Container>
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