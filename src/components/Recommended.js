import React from 'react'

const Recommended = (props) => {

  if (!props.show) {
    return null
  }

  const padding = {
    paddingRight: '10px'
  }

  const alignRight = {
    float: 'right'
  }

  const rightPadding = {
    paddingRight: '5px'
  }

  const fontStyle = {
    fontFamily: 'Verdana, Geneva, Tahoma, sans-serif'
  }

  return (
    <div>
      <br />
      <h2 data-toggle='tooltip' data-placement='top' title='recommendations page' aria-label='recommendations page'>
        recommendations
      </h2>
      <br />
      {props.favoriteBooks.length > 0
      ? <>
        <div style={fontStyle}>books in your favorite genre<span style={rightPadding}></span>
          <b data-toggle='tooltip' data-placement='top' title={props.favoriteGenre} aria-label={props.favoriteGenre}>
            {props.favoriteGenre}:</b><br /><br />
        </div>

        <table>
          <tbody>
            <tr>
              <th style={padding}></th>
              <th style={padding}
                data-toggle='tooltip' data-placement='top' title='author' aria-label='author'>
                author
              </th>
              <th data-toggle='tooltip' data-placement='top' title='published' aria-label='published'>
                published
              </th>
            </tr>
            {props.favoriteBooks.map((b,v,i) =>
              <tr key={v}>
                <td style={padding}
                  data-toggle='tooltip' data-placement='top' title={b.title} aria-label={b.title}>
                  <em>{b.title}</em>
                </td>
                <td style={padding}
                  data-toggle='tooltip' data-placement='top' title={b.author.name} aria-label={b.author.name}>
                  {b.author.name}
                </td>
                <td style={alignRight}
                  data-toggle='tooltip' data-placement='top' title={b.published} aria-label={b.published}>
                  {b.published}
                </td>
              </tr>
              )
            }
          </tbody>
        </table>
        </>
      : 
        <div style={fontStyle}>no recommendations for your favorite genre<span style={rightPadding}></span>
          <b data-toggle='tooltip' data-placement='top' title={props.favoriteGenre} aria-label={props.favoriteGenre}>
            {props.favoriteGenre}:</b><br /><br />
        </div>
      }
    </div>
  )
}

export default Recommended
