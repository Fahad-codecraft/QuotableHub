# ReadMe.md

QuotableHub is a free, open source quotes API. Highly Inspired By [quotable.io](quotables.io) by [lukePeavey](https://github.com/lukePeavey). With access to over a million carefully curated quotes spanning various themes, QuotableHub API offers an expansive collection to enrich your applications, websites, or creative projects.

As the sole architect of QuotableHub, I&#039;ve meticulously curated a vast database featuring quotes, a small fraction of approximately 7000 quotes contains some inaccuracies and duplicarions which was missed during creating the dataset. However, the rest have been thoroughly checked for reliability and quality.

I take immense pride in this creation and remain committed to continually refining and improving QuotableHub. Your support and understanding are invaluable as I work towards perfecting this repository of inspiration.

Stay tuned! QuotableHub is continuously evolving. More exciting features are on the way to enhance your experience with an even larger collection of accurate quotes and smoother functionality.

# Rate Limit

There is a rate limit of **180 requests per minute**, per IP address.  If you exceed the rate limit, the API will respond with a `429` error.

# API servers

```HTTP
https://www.quotablehub.tech/
```

# Get Random Quotes

```HTTP
GET / quotes / random;
```

Get one or more random quotes from the database using filters that enable selecting quotes based on specific properties like `tags` or `length` etc.

By default, this method returns a single quote randomly, but, you can customize it how you want, you can specify how much random quotes you want using `limit` parameter.

| param     | type     | Description                                                                                                                                                                                                                                                                                                                                                                                               |
| --------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| limit     | `Int`    | `default: 1` `min: 1` `max: 50` The number of random quote you want                                                                                                                                                                                                                                                                                                                                       |
| maxLength | `Int`    | The maximim length in characters(can be combined with `minLength`)                                                                                                                                                                                                                                                                                                                                        |
| minLength | `Int`    | The minimum length in characters(can be combined with `maxLength`)                                                                                                                                                                                                                                                                                                                                        |
| tags      | `String` | Get a random quote with tag(s). You can give one or more tag names, seprated by a comma(meaning `AND`) or a pipe(&#124;)(meaning `OR`). Comma separated list match that have all of the given tags. Pipe(&#124;) separated list will match quotes that have any one of one of the provided tag name. Tag names are not case-sensitive. You can put any how like ("tag-name") or with a space("tag name"). |
| author    | `String` | Get a random quote be one or more authors. The value can be an author `name` or `slug`. To include quotes by multiple author add a pipe(&#124;) between them                                                                                                                                                                                                                                              |

##### Response

```ts
// An array containing one or more Quotes
Array<{
  _id: string;
  // The quote text
  Quote: string;
  // The full name of the author
  Author: string;
  // The `slug` of the quote author
  Tag: string[];
  // The length of quote (number of characters)
  length: number;
  // An array of tag names for this quote
  slug: string;
}>;
```

### Examples

Get random quote

```HTTP
GET /quotes/random
```

Get 5 random quotes

```HTTP
GET /quotes/random?limit=3
```

Random Quote with tags &quot;tech&quot; `AND` &quot;love&quot;

```HTTP
GET /quotes/random?tags=tech,love
```

Random Quote with tags &quot;animal&quot; `OR` &quot;care&quot;

```HTTP
GET /quotes/random?tags=animal|care
```

Random Quote with 100 characters maximum

```HTTP
GET /quotes/random?maxLength=100
```

Random Quote between 100 - 150 characters

```HTTP
GET /quotes/random?minLength=100&maxLength=150
```

# List Quotes

```HTTP
GET /quotes
```

Get all quotes matching a given query. By default, this will return a list of all quotes in paginated form, sorted by `_id`. Quotes can be filtered according to author, tag and length

| param     | type     | Description                                                                                                                                                                                                                                                                                                                                                                                       |     |
| --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| maxLength | `Int`    | The maximim length in characters(can be combined with `minLength`)                                                                                                                                                                                                                                                                                                                                |
| minLength | `Int`    | The minimum length in characters(can be combined with `maxLength`)                                                                                                                                                                                                                                                                                                                                |
| tags      | `String` | Get a random quote with tag(s). You can give one or more tag names, seprated by a comma(meaning `AND`) or a pipe(&#124;)(meaning `OR`). Comma separated list match that have all of the given tags. Pipe(&#124;) separated list will match quotes that have any one of the provided tag name. Tag names are not case-sensitive. You can put any how like ("tag-name") or with a space("tag name). |
| author    | `String` | Get a random quote be one or more authors. The value can be an author `name` or `slug`. To include quotes by multiple author add a pipe(&#124;) between them                                                                                                                                                                                                                                      |
| limit     | `Int`    | `default: 20` `min: 1` `max: 150` The number of quotes you want per page                                                                                                                                                                                                                                                                                                                          |
| page      | `Int`    | the page number you want to set. `page`                                                                                                                                                                                                                                                                                                                                                           |

```ts
{
  // Current page number
  page: number,
  // max number of quotes on each page
  limit: number,
  // The number of quotes returned in this response
  totalQuotes: number,
  // The total number of pages matching this request
  totalPages: number,
}


// An array containing one or more Quotes
Array<{
  _id: string
  // The quote text
  Quote: string
  // The full name of the author
  Author: string
  // The `slug` of the quote author
  Tag: string[]
  // The length of quote (number of characters)
  length: number
  // An array of tag names for this quote
  slug: string
}>
```

### Examples

Get first page of quotes, with default limit: 20 results per page

```HTTP
GET /quotes?page=1
```

Get second page of quotes, with 30 results per page

```HTTP
GET /quotes?page=2&limit=30
```

Get all quotes with tags `love` `OR` `happiness`

```HTTP
GET /quotes?tags=love|happiness
```

Get all quotes with tags `technology` `AND` `love`

```HTTP
GET /quotes?tags=technology,love
```

Get all quotes by `author` or by `slug`

```HTTP
GET /quotes?author=albert einstein
GET /quotes?slug=albert-einstein
```

# Get a quote by its ID

```HTTP
GET /quotes/:id
```

#### Response

```ts
{
  _id: string
  // The quote text
  Quote: string
  // The full name of the author
  Author: string
  // An array of tag names for this quote
  tags: string[]
  // The length of quote (number of characters)
  length: number
  slug: string
}
```

# List Authors

```HTTP
GET /authors
```

Get all authors matching the given query. You can look for specific authors by their names, slugs or IDs, and it allows sorting and filtering options too.

| param  | type     | Description                                                                                                                                                   |
| ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name   | `string` | Filter authors by `name`. The value can be one or more author `name`. To get multiple authors by `name`, the value should be a pipe separated list of `name`. |
| slug   | `string` | Filter authors by `slug`. The value can be one or more author `slug`. To get multiple authors by `slug`, the value should be a pipe separated list of `slug`. |
| sortBy | `enum`   | `Default: "name"` `values: "name", "quoteCount"`. The field used to sort authors                                                                              |
| order  | `enum`   | `values: "asc", "desc"`. The order in which results are sorted. The default order is asc.                                                                     |
| limit  | `Int`    | `Min: 1` `Max: 150` `Default: 20`. Sets the number of results per page.                                                                                       |
| page   | `Int`    | `Min: 1` `Default: 1`. The page of results to return. If the value is greater than the total number of pages, request will not return any results             |

```ts
{
  // Current page number
  page: number;
  // max quotes per page
  limit: number;
  // total number of authors mathing this request
  totalAuthors: number;
  // toatal number of pages matching this request
  totalPages: number;
  // The array of authors
  authors: Array<{
    // A unique id for this author
    _id: string;
    // quote text
    Quote: string;
    // author name
    Author: string;
    // Tags
    Tags: string[];
    // length of the quote in characters
    length: number;
    // slug of author
    slug: string;
  }>;
}
```

There will be 2 kind of response first one is above without sortBy and order, and second one is of with sortBy and order. dont use sortBy and order with slug or name as it will not work.
Here is second kind of response

```ts
{
  // Current page number
  page: number;
  // max quotes per page
  limit: number;
  // total number of authors mathing this request
  totalAuthors: number;
  // toatal number of pages matching this request
  totalPages: number;
  // The array of authors
  authors: Array<{
    // how many quotes of the author:
    QuoteCount: number;
    // Author name
    Author: string;
  }>;
}
```

##### Examples

Get all authors, sorted alphabetically by name

```HTTP
GET /authors?sortBy=name
```

Get all authors, sorted by number of quotes in descending order

```HTTP
GET /authors?sortBy=quoteCount&order=desc
```

Get a single author by slug.

```HTTP
GET /authors?slug=abraham-lincoln
```

Get multiple authors by slug. In this case, you provide a pipe-separated list of slugs

```HTTP
GET /authors?slug=albert-einstein|abraham-lincoln
```

# Search Quotes

```HTTP
GET /search/quotes
```

This allows you to search for quotes by keywords, content, and/or author name.

- The query can be wrapped in quotes to search for an exact phrase. In this case, results will only include quotes that match the query exactly.

| param  | type     | Description                                                                                                                                                            |
| ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| query  | `string` | The search string. The query can be wrapped in quotes to search for an exact phrase.                                                                                   |
| fields | `string` | `Default: "content,author"` Specify the fields to search by. Supported search fields are "content", "author". By default, it will search by all fields simultaneously. |
| limit  | `Int`    | `Min: 1` `Max: 150` `Default: 20`. The maximum number of results per page                                                                                              |
| page   | `Int`    | `Min: 1` `Default: 1` Sets the page number                                                                                                                             |

##### Response

```ts
{
  //Page info
  pageInfo: {
    // current page number
    page: number;
    // result per page
    limit: number;
    // total results found
    totalResults: number;
    // total number of pages
    totalPages: number;
  }
  // results
  results: Array<{
    // unique id
    _id: string;
    // quote text
    Quote: string;
    // author name
    Author: string;
    // tags
    Tags: string[];
    // length of quote in characters
    length: number;
    // author slug
    slug: string;
  }>;
}
```

##### Examples

Search for &quot;only a life lived for others is a&quot;

```HTTP
GET /search/quotes?query=only a life lived for others is a life worthwhile
```

> Results:
>
> &quot;Only a life lived for others is a life worthwhile&quot;

Search for the phrase &quot;divided house&quot;

```HTTP
GET /search/quotes?query=love life
```

> Results:
>
> &quot;To be creative means to be in love with life. You can be creative only if you love life enough that you want to enhance its beauty, you want to bring a little more music to it, a little more poetry to it, a little more dance to it&quot;

Search for quotes by an author named &quot;kennedy&quot;

```HTTP
GET /search/quotes?query=Kennedy&fields=author
```

# Search Authors

```HTTP
GET  /search/authors
```

This endpoint allows you search for authors by name.

| param | type     | Description                                                              |
| ----- | -------- | ------------------------------------------------------------------------ |
| query | `string` | The search string.                                                       |
| limit | `Int`    | `Min: 1` `Max: 150` `Default: 20` The maximum number of results per page |
| page  | `Int`    | `Min: 1` `Default: 1` Sets the page number                               |

##### Response

```ts
{
  // current page number
  page: number;
  // result per page
  limit: number;
  // total results found
  totalResults: number;
  // total number of pages
  totalPages: number;
  // authors
  authors: Array<{
    // unique id
    _id: string;
    // quote text
    Quote: string;
    // author name
    Author: string;
    // tags
    Tags: string[];
    // length of quote in characters
    length: number;
    // author slug
    slug: string;
  }>;
}
```

##### Examples

Search for author named &quot;lincoln&quot;

```HTTP
GET /search/authors?query=lincoln
```

> Results:
>
> Abraham Lincoln

Search for &quot;mark mason&quot;

```HTTP
GET /search/authors?query=mark mason
```

Search for &quot;John Quincy Adams&quot;

```HTTP
GET /search/authors?query=john quincy adams
```

Stay tuned! QuotableHub is continuously evolving. More exciting features are on the way to enhance your experience with an even larger collection of accurate quotes and smoother functionality.
