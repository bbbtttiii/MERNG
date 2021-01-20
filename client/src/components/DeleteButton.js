import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { Button, Confirm, Icon } from 'semantic-ui-react'
// import { FETCH_POSTS_QUERY } from '../utilities/graphql'

export default function DeleteButton({ postId, callback }) {

  const [confirmOpen, setConfirmOpen] = useState(false)

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update() {
      setConfirmOpen(false)
      // TODO: remove post from cache
      if (callback) callback()
    },
    variables: { postId }
  })
  
  return (
    <>
      <Button
        as='div'
        color='red'
        floated='right'
        onClick={() => setConfirmOpen(true)}>
        <Icon name='trash' style={{width: 5}} />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePost}
      />
    </>
  )
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`