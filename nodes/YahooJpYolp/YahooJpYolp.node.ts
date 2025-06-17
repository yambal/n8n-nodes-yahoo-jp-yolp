import type {
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';

/**
 * 宣言型ノードの場合、通常はINodeTypeとINodeTypeDescriptionがインポートされます。
 * ノードの主要なロジックを定義するクラスを作成し、INodeTypeインターフェースを実装します。
 */
export class YahooJpYolp implements INodeType {
  // ノードのメタデータを定義します。INodeTypeDescription型を持つ
	description: INodeTypeDescription = {
		displayName: 'Yahoo Jp Yolp',
		name: 'yahooJpYolp',
    icon: 'file:yahooJpYolp.svg',
		group: ['transform'],     //  ワークフローの実行時にノードがどのように振る舞うか trigger, schedule, input, output
		version: 1,
    subtitle: '={{$parameter["operation"]}}',
		description: 'Map and local information API provided by Yahoo! Maps for developers',
		defaults: {
			name: 'Yahoo Jp YOLP',
		},
		inputs: [NodeConnectionType.Main],  // 入力コネクタの名前を定義します。単一のコネクタの場合は['main']と指定します
		outputs: [NodeConnectionType.Main],  // 出力コネクタの名前を定義します。単一のコネクタの場合は['main']と指定します
    credentials: [  // ノードが使用する認証情報を定義します。
      {
        name: 'yahooJpDeveloperApi',
        required: true,
      },
    ],
    requestDefaults: {  // ノードが行うAPI呼び出しの基本的な情報を設定します。baseURLは必須で、共通のheadersやurlなどを指定できます
      baseURL: 'https://map.yahooapis.jp',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
		properties: [ // ノードの動作を定義する重要な部分,
      {
        displayName: 'Operation', // 操作オブジェクト: 特定のリソースに対して実行できる「操作」（例: "Get all"）を定義します。options配列内に各操作の動作（ルーティング、REST動詞など）を記述します。
        name: 'operation',
        type: 'options',
        default: 'Geocode',
        noDataExpression: true,
        options: [
          {
            name: 'Geocode',
            value: 'Geocode',
            action: 'Geocode',
            description: 'Specify an address and output its location information (latitude and longitude)',
            routing: {
              request: {
                method: 'GET',
                url: '/geocode/V1/geoCoder',
                qs: {
                  output: 'json',
                }
              }
            }
          },
          {
            name: 'Reverse Geocoder',
            value: 'Reverse Geocoder',
            action: 'Reverse geocoder',
            description: 'Get point2',
            routing: {
              request: {
                method: 'GET',
                url: '/geoapi/V1/reverseGeoCoder',
                qs: {
                  output: 'json',
                }
              }
            }
          }
        ]
      },
      {
				displayName: 'Geocode Query',
				name: 'geocodeQuery',
				type: 'string',
        default: '東京都港区六本木',
        description: 'Address to get location information',
        noDataExpression: true,
        routing: {
          request: {
            qs: {
              query: '={{$parameter.geocodeQuery}}',
            }
          }
        },
        displayOptions: {
          show: {
            operation: [
              'Geocode',
            ]
          }
        }
			},
      {
        displayName: 'Address Level',
        name: 'geocodeAddressLevel',
        type: 'options',
        default: '3',
        description: 'Address detail level',
        options: [
          {
            name: 'Prefecture Level',
            value: '1',
          },
          {
            name: 'Municipality Level',
            value: '2',
          },
          {
            name: 'Town or District Level',
            value: '3',
          },
          {
            name: 'Block or Subdistrict Level',
            value: '4',
          }
        ],
        routing: {
          request: {
            qs: {
              al: '={{$parameter.geocodeAddressLevel}}',
            }
          }
        },
        displayOptions: {
          show: {
            operation: [
              'Geocode',
            ]
          }
        }
      },
      {
        displayName: 'Address Range',
        name: 'geocodeAddressRange',
        type: 'options',
        default: 'le',
        description: 'Search scope of address levels',
        options: [
          {
            name: 'Greater Equal',
            value: 'ge',
          },
          {
            name: 'Less Equal',
            value: 'le',
          },
          {
            name: 'Equal',
            value: 'eq',
          }
        ],
        routing: {
          request: {
            qs: {
              ar: '={{$parameter.geocodeAddressRange}}',
            }
          }
        },
        displayOptions: {
          show: {
            operation: [
              'Geocode',
            ]
          }
        }
      },
      {
        displayName: 'Results',
        name: 'geocodeResults',
        type: 'number',
        default: 10,
        description: 'Number of results to return',
        routing: {
          request: {
            qs: {
              results: '={{$parameter.geocodeResults}}',
            }
          }
        },
        displayOptions: {
          show: {
            operation: [
              'Geocode',
            ]
          }
        }
      },
      {
        displayName: 'Latetude',
        name: 'reverseGeoCoderLatetude',
        type: 'number',
        default: 35,
        description: 'Is Latetude',
        routing: {
          request: {
            qs: {
              lat: '={{$parameter.reverseGeoCoderLatetude}}',
            }
          }
        },
        displayOptions: {
          show: {
            operation: [
              'Reverse Geocoder',
            ]
          }
        }
      },
      {
        displayName: 'Longitude',
        name: 'reverseGeoCoderLongitude',
        type: 'number',
        default: 135,
        description: 'Is Longitude',
        routing: {
          request: {
            qs: {
              lon: '={{$parameter.reverseGeoCoderLongitude}}',
            }
          }
        },
        displayOptions: {
          show: {
            operation: [
              'Reverse Geocoder',
            ]
          }
        }
      }
		],
    usableAsTool: true,
	}
}
