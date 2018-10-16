import React from 'react'

export default function Grid () {
  return (
    <div className='grid'>
      <h2>Grid</h2>
      <div className='row'>
        <div className='col-md-1'><div>1</div></div>
        <div className='col-md-1'><div>1</div></div>
        <div className='col-md-1'><div>1</div></div>
        <div className='col-md-1'><div>1</div></div>
        <div className='col-md-1'><div>1</div></div>
        <div className='col-md-1'><div>1</div></div>
        <div className='col-md-1'><div>1</div></div>
        <div className='col-md-1'><div>1</div></div>
        <div className='col-md-1'><div>1</div></div>
        <div className='col-md-1'><div>1</div></div>
        <div className='col-md-1'><div>1</div></div>
        <div className='col-md-1'><div>1</div></div>
      </div>
      <div className='row'>
        <div className='col-md-2'><div>2</div></div>
        <div className='col-md-2'><div>2</div></div>
        <div className='col-md-2'><div>2</div></div>
        <div className='col-md-2'><div>2</div></div>
        <div className='col-md-2'><div>2</div></div>
        <div className='col-md-2'><div>2</div></div>
      </div>
      <div className='row'>
        <div className='col-md-3'><div>3</div></div>
        <div className='col-md-3'><div>3</div></div>
        <div className='col-md-3'><div>3</div></div>
        <div className='col-md-3'><div>3</div></div>
      </div>
      <div className='row'>
        <div className='col-md-4'><div>4</div></div>
        <div className='col-md-4'><div>4</div></div>
        <div className='col-md-4'><div>4</div></div>
      </div>
      <div className='row'>
        <div className='col-md-6'><div>6</div></div>
        <div className='col-md-6'><div>6</div></div>
      </div>
      <div className='row'>
        <div className='col-md-5'><div>5</div></div>
        <div className='col-md-5 col-md-offset-2'><div>5 offset-2</div></div>
      </div>
      <div className='row'>
        <div className='col-md-8 col-md-offset-2'><div>8 offset-2</div></div>
      </div>
    </div>
  )
}
