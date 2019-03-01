import React from 'react'

export default function Type () {
  return (
    <div>
      <h1><strong>h1. Far far away, behind the word mountains</strong></h1>
      <h1>h1. Far far away, behind the word mountains</h1>
      <h2><strong>h2. Far far away, behind the word mountains</strong></h2>
      <h2>h2. Far far away, behind the word mountains</h2>
      <h3><strong>h3. Far far away, behind the word mountains</strong></h3>
      <h3>h3. Far far away, behind the word mountains</h3>
      <h4><strong>h4. Far far away, behind the word mountains</strong></h4>
      <h4>h4. Far far away, behind the word mountains</h4>
      <p>Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula.</p>
      <p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec ullamcorper nulla non metus auctor fringilla. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Donec ullamcorper nulla non metus auctor fringilla.</p>
      <p>Maecenas sed diam eget risus varius blandit sit amet non magna. Donec id elit non mi porta gravida at eget metus. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.</p>
      <h5><strong>h5. Far far away, behind the word mountains</strong></h5>
      <h5>h5. Far far away, behind the word mountains</h5>
      <h6><strong>h6. Far far away, behind the word mountains</strong></h6>
      <h6>h6. Far far away, behind the word mountains</h6>
      <small><strong>Small text</strong></small><br />
      <small>Small text</small>

      <div>
        <p><a href='javascript:;'>Here is a text link</a></p>
        <p><button className='btn btn-link'>Button link</button></p>
      </div>

      <br />
      <br />
      <h4>Horizontal description</h4>
      <dl className="dl-horizontal">
        <dt>Description lists</dt>
        <dd>A description list is perfect for defining terms.</dd>
        <dt>Euismod</dt>
        <dd>Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec elit.<br />
        Donec id elit non mi porta gravida at eget metus.</dd>
        <dt>Malesuada porta</dt>
        <dd>Etiam porta sem malesuada magna mollis euismod.</dd>
        <dt>Felis euismod semper eget lacinia</dt>
        <dd>Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</dd>
      </dl>

      <br />
      <br />

      <h4>Pagination</h4>
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li className="disabled">
            <a href="javascript:;" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li className="active"><a href="javascript:;">1</a></li>
          <li><a href="javascript:;">2</a></li>
          <li><a href="javascript:;">3</a></li>
          <li><a href="javascript:;">4</a></li>
          <li><a href="javascript:;">5</a></li>
          <li>
            <a href="javascript:;" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
      <br />
      <br />

      <h4>Pager</h4>
      <nav aria-label="...">
        <ul className="pager">
          <li><a href="javascript:;">Previous</a></li>
          <li><a href="javascript:;">Next</a></li>
        </ul>
      </nav>

      <br />
      <br />
      Alternatively, you can align each link to the sides:
      <br />
      <nav aria-label="...">
        <ul className="pager">
          <li className="previous"><a href="javascript:;"><span aria-hidden="true">&larr;</span> Older</a></li>
          <li className="next"><a href="javascript:;">Newer <span aria-hidden="true">&rarr;</span></a></li>
        </ul>
      </nav>
    </div>
  )
}
