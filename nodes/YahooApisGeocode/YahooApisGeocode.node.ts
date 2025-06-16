import type {
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';

/**
 * 宣言型ノードの場合、通常はINodeTypeとINodeTypeDescriptionがインポートされます。
 * ノードの主要なロジックを定義するクラスを作成し、INodeTypeインターフェースを実装します。
 */
export class YahooApisGeocode implements INodeType {
  // ノードのメタデータを定義します。INodeTypeDescription型を持つ
	description: INodeTypeDescription = {
		displayName: 'Yahoo APIs Geocode',
		name: 'yahooApisGeocode',
    icon: 'file:nasapics.svg',
		group: ['transform'],     //  ワークフローの実行時にノードがどのように振る舞うか trigger, schedule, input, output
		version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Yahoo APIs Geocode',
		defaults: {
			name: 'Example Node',
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
		properties: [ // ノードの動作を定義する重要な部分
			{
				displayName: 'Resource',  // リソースオブジェクト: APIで操作する「リソース」（例: "Card"）を定義します。displayNameは常に'Resource'、nameは常に'resource'とするのが標準です
				name: 'resource',
				type: 'options',
        default: 'geoCoder',
        noDataExpression: true,
				options: [
          {
            name: 'Geocoder',
            value: 'geoCoder',
          }
        ]
			},
      {
				displayName: 'Query',
				name: 'query',
				type: 'string',
        default: '東京都港区六本木',
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: [
              'geoCoder',
            ]
          }
        },
        routing: {
          request: {
            qs: {
              query: '={{$parameter.query}}',
            }
          }
        }
			},
      {
        displayName: 'Operation', // 操作オブジェクト: 特定のリソースに対して実行できる「操作」（例: "Get all"）を定義します。options配列内に各操作の動作（ルーティング、REST動詞など）を記述します。
        name: 'operation',
        type: 'options',
        default: 'geocoding',
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: [
              'geoCoder',
            ]
          }
        },
        options: [
          {
            name: 'Geocode',
            value: 'geocoding',
            action: 'Geocode',
            description: 'Get point',
            routing: {
              request: {
                method: 'GET',
                url: '/geocode/V1/geoCoder',
                qs: {
                  output: 'json',
                }
              }
            }
          }
        ]
      },
		],
    usableAsTool: true,
	}
}
