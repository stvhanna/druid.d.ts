/// <reference path="druid.d.ts" />

var timeBoundaryQuery: Druid.Query = {
    "queryType": "timeBoundary",
    "dataSource": "sample_datasource",
    "bound": "maxTime"
};

var timeseriesQuery: Druid.Query = {
    "queryType": "timeseries",
    "dataSource": "sample_datasource",
    "granularity": "day",
    "filter": {
        "type": "and",
        "fields": [
            { "type": "selector", "dimension": "sample_dimension1", "value": "sample_value1" },
            { "type": "or",
                "fields": [
                    { "type": "selector", "dimension": "sample_dimension2", "value": "sample_value2" },
                    { "type": "selector", "dimension": "sample_dimension3", "value": "sample_value3" }
                ]
            }
        ]
    },
    "aggregations": [
        { "type": "longSum", "name": "sample_name1", "fieldName": "sample_fieldName1" },
        { "type": "doubleSum", "name": "sample_name2", "fieldName": "sample_fieldName2" }
    ],
    "postAggregations": [
        { "type": "arithmetic",
            "name": "sample_divide",
            "fn": "/",
            "fields": [
                { "type": "fieldAccess", "name": "sample_name1", "fieldName": "sample_fieldName1" },
                { "type": "fieldAccess", "name": "sample_name2", "fieldName": "sample_fieldName2" }
            ]
        }
    ],
    "intervals": [ "2012-01-01T00:00:00.000/2012-01-03T00:00:00.000" ]
};

var timeseriesResult: Druid.TimeseriesResults = [
    {
        "timestamp": "2012-01-01T00:00:00.000Z",
        "result": { "sample_name1": 3, "sample_name2": 3, "sample_divide": 3 }
    },
    {
        "timestamp": "2012-01-02T00:00:00.000Z",
        "result": { "sample_name1": 3, "sample_name2": 3, "sample_divide": 3 }
    }
];

var topNQuery: Druid.Query = {
    "queryType": "topN",
    "dataSource": "sample_data",
    "dimension": "sample_dim",
    "threshold": 5,
    "metric": "count",
    "granularity": "all",
    "filter": {
        "type": "and",
        "fields": [
            {
                "type": "selector",
                "dimension": "dim1",
                "value": "some_value"
            },
            {
                "type": "selector",
                "dimension": "dim2",
                "value": "some_other_val"
            }
        ]
    },
    "aggregations": [
        {
            "type": "longSum",
            "name": "count",
            "fieldName": "count"
        },
        {
            "type": "doubleSum",
            "name": "some_metric",
            "fieldName": "some_metric"
        }
    ],
    "postAggregations": [
        {
            "type": "arithmetic",
            "name": "sample_divide",
            "fn": "/",
            "fields": [
                {
                    "type": "fieldAccess",
                    "name": "some_metric",
                    "fieldName": "some_metric"
                },
                {
                    "type": "fieldAccess",
                    "name": "count",
                    "fieldName": "count"
                }
            ]
        }
    ],
    "intervals": [
        "2013-08-31T00:00:00.000/2013-09-03T00:00:00.000"
    ]
};

var topNResults: Druid.DruidResults = [
    {
        "timestamp": "2013-08-31T00:00:00.000Z",
        "result": [
            {
                "dim1": "dim1_val",
                "count": 111,
                "some_metrics": 10669,
                "average": 96.11711711711712
            },
            {
                "dim1": "another_dim1_val",
                "count": 88,
                "some_metrics": 28344,
                "average": 322.09090909090907
            },
            {
                "dim1": "dim1_val3",
                "count": 70,
                "some_metrics": 871,
                "average": 12.442857142857143
            },
            {
                "dim1": "dim1_val4",
                "count": 62,
                "some_metrics": 815,
                "average": 13.14516129032258
            },
            {
                "dim1": "dim1_val5",
                "count": 60,
                "some_metrics": 2787,
                "average": 46.45
            }
        ]
    }
];

var groupByQuery: Druid.Query = {
    "queryType": "groupBy",
    "dataSource": "sample_datasource",
    "granularity": "day",
    "dimensions": ["dim1", "dim2"],
    "limitSpec": { "type": "default", "limit": 5000, "columns": ["dim1", "metric1"] },
    "filter": {
        "type": "and",
        "fields": [
            { "type": "selector", "dimension": "sample_dimension1", "value": "sample_value1" },
            { "type": "or",
                "fields": [
                    { "type": "selector", "dimension": "sample_dimension2", "value": "sample_value2" },
                    { "type": "selector", "dimension": "sample_dimension3", "value": "sample_value3" }
                ]
            }
        ]
    },
    "aggregations": [
        { "type": "longSum", "name": "sample_name1", "fieldName": "sample_fieldName1" },
        { "type": "doubleSum", "name": "sample_name2", "fieldName": "sample_fieldName2" }
    ],
    "postAggregations": [
        { "type": "arithmetic",
            "name": "sample_divide",
            "fn": "/",
            "fields": [
                { "type": "fieldAccess", "name": "sample_name1", "fieldName": "sample_fieldName1" },
                { "type": "fieldAccess", "name": "sample_name2", "fieldName": "sample_fieldName2" }
            ]
        }
    ],
    "intervals": [ "2012-01-01T00:00:00.000/2012-01-03T00:00:00.000" ],
    "having": { "type": "greaterThan", "aggregation": "sample_name1", "value": 0 }
};

var groupByResults: Druid.GroupByResults = [
  {
    "version": "v1",
    "timestamp": "2012-01-01T00:00:00.000Z",
    "event": {
      "dim1": "some_dim_value_one>",
      "dim2": "some_dim_value_two>",
      "sample_name1": "some_sample_name_value_one>",
      "sample_name2": "some_sample_name_value_two>",
      "sample_divide": "some_sample_divide_value"
    }
  },
  {
    "version": "v1",
    "timestamp": "2012-01-01T00:00:00.000Z",
    "event": {
      "dim1": "some_other_dim_value_one>",
      "dim2": "some_other_dim_value_two>",
      "sample_name1": "some_other_sample_name_value_one>",
      "sample_name2": "some_other_sample_name_value_two>",
      "sample_divide": "some_other_sample_divide_value"
    }
  }
];

var segmentMetadataQuery: Druid.Query = {
    "queryType": "segmentMetadata",
    "dataSource": "sample_datasource",
    "intervals": ["2013-01-01/2014-01-01"],
    "toInclude": {
        "type": "list",
        "columns": ['column1', 'column2']
    },
    "merge": true
};

var segmentMetadataResult: Druid.SegmentMetadataResults = [
    {
        "id": "some_id",
        "intervals": [ "2013-05-13T00:00:00.000Z/2013-05-14T00:00:00.000Z" ],
        "columns": {
            "__time": { "type": "LONG", "size": 407240380, "cardinality": null },
            "dim1": { "type": "STRING", "size": 100000, "cardinality": 1944 },
            "dim2": { "type": "STRING", "size": 100000, "cardinality": 1504 },
            "metric1": { "type": "FLOAT", "size": 100000, "cardinality": null }
        },
        "size": 300000
    }
];
