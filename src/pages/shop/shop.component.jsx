import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import { 
    firestore , 
    convertCollectionsSnapshotToMap } 
    from '../../firebase/firebase.utils';

import { updateCollections } from '../../redux/shop/shop.actions';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);


class ShopPage extends React.Component {
    
    state = {
        loading: true
    }
    
    unsubscribeFromSnapshot = null;

    componentDidMount(){
        const { updateCollections }= this.props;
        const collectionRef = firestore.collection('collections');

        this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            console.log(collectionsMap);
            updateCollections(collectionsMap);
            this.setState({ loading: false });
        })
    }

    render() {
        const { match } = this.props;
        const { loading } = this.state;
        return (
            (
                <div className='shop-page'>
                    <Route 
                        exact 
                        path={`${match.path}`} 
                        component={ props => (
                            <CollectionsOverviewWithSpinner isLoading={loading} {...props}/>
                        )}
                    />
                    <Route 
                        path={`${match.path}/:collectionId`} 
                        component={props => (
                            <CollectionPageWithSpinner isLoading={loading} {...props}/> 
                        )} 
                    />
                </div>
                
            )
        )
    }

}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectiosMap => 
        dispatch(updateCollections(collectiosMap))
})
    

export default connect(null, mapDispatchToProps)(ShopPage);