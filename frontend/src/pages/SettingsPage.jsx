import Form from 'react-bootstrap/Form';

function SettingsPage() {

    return (
      <div className='flex-center'>
        <h1 className='hobbiton-brushhand'>Settings</h1>
        <Form className='flex-center'>

            <Form.Group className="mb-3 center-text">
                <Form.Label>Main Volume</Form.Label>
                <Form.Range />
            </Form.Group>

            <Form.Group className="mb-3 center-text">
                <Form.Label>SFX Volume</Form.Label>
                <Form.Range />
            </Form.Group>

            <Form.Group className="mb-3 center-text">
                <Form.Label>Music Volume</Form.Label>
                <Form.Range />
            </Form.Group>

        </Form>
      </div>
    )
  }
  
  export default SettingsPage