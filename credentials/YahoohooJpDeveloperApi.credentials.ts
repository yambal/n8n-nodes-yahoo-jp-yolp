import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class YahoohooJpDeveloperApi implements ICredentialType {
	name = 'yahooJpDeveloperApi'
	displayName = 'Yahoo Developer API';
	// Uses the link to this tutorial as an example
	// Replace with your own docs links when building your own nodes
	documentationUrl = 'https://e.developer.yahoo.co.jp/dashboard/';
	properties: INodeProperties[] = [
		{
			displayName: 'App Id',
			name: 'appid',
			type: 'string',
      typeOptions: {
        password: true,
      },
			default: '',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			qs: {
				'appid': '={{$credentials.appid}}'
			}
		},
	};
}