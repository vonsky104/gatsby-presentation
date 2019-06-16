import React, { Component } from 'react'
import { graphql } from 'gatsby'
import axios from 'axios'

// This query is executed at build time by Gatsby.
export const GatsbyQuery = graphql`
  query {
    cms {
      cuisines {
        id
        name
      }
    }
  }
`

class ClientFetchingExample extends Component {
  state = {
    loading: true,
    error: false,
    pupper: {
      img: '',
      breed: '',
    },
  }

  componentDidMount() {
    this.fetchPupper()
  }

  render() {
    const cuisines = this.props.data.cms.cuisines;
    const { img, breed } = this.state.pupper

    return (
      <div style={{ textAlign: 'center', width: '600px', margin: '50px auto' }}>
        {
          cuisines.map((e, index) => (
            <div key={index}>
              <h1>{e.name} i jakiś pies</h1>
            </div>
          ))
        }

        <p>
         Żarełko zostało zaciągnięte przez graphQl'a w buildtime'ie, natomiast piezeg jest pobrany już w runtimie.
        </p>
        <div>
          {this.state.loading ?
            <p>Pobieram piezga!</p> :
            img && breed ? (
            <>
              <h2>{`${breed} pziag!`}</h2>
              <img src={img} alt={`cute random `} style={{ maxWidth: 300 }} />
            </>
          ) : (
            <p>Błąd wystąpił panie kolego</p>
          )}
        </div>
      </div>
    )
  }

  // This data is fetched at run time on the client.
  fetchPupper = () => {
    this.setState({ loading: true })

    axios
      .get(`https://dog.ceo/api/breeds/image/random`)
      .then(pupper => {
        const {
          data: { message: img },
        } = pupper
        const breed = img.split('/')[4]

        this.setState({
          loading: false,
          pupper: {
            ...this.state.pupper,
            img,
            breed,
          },
        })
      })
      .catch(error => {
        this.setState({ loading: false, error })
      })
  }
}

export default ClientFetchingExample
