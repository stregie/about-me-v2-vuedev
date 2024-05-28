<template>  
  <div id = "test-page">
		<h1>File uploader test</h1>
		
		<div>
			<h2><b>Example 01:</b> Fetch</h2>
			<button type = "button" @click = "ex01fetch">Test Fetch</button>
			<p>Server response: <b>{{ ex01data }}</b></p>
		</div>
		
		<div>
			<h2><b>Example 02:</b> Upload</h2>
			<label>Path</label><input type = "text" v-model = "ex02path" /><br />
			
			<input type = "file" @change = "ex02onChange" multiple = "true" />
			<button type = "button" @click = "ex02submitFiles">Submit</button>
			
			<p>Server response: {{ ex02serverResponse }}</p>
		</div>

		<div>
			<h2><b>Example 03:</b> Get test filelist</h2>
			
			<button type = "button" @click = "ex03fetch">Fetch</button>
			<details>
				<summary>File list json</summary>
				<pre>{{ ex03data }}</pre>
			</details>
		</div>

		<div>
			<h2><b>Example 04:</b> Get test folderlist</h2>
				<button type = "button" @click = "ex04fetch">Fetch</button>
				<details>
					<summary>Folder tree json</summary>
					<pre>{{ ex04data }}</pre>
				</details>
		</div>

		<div>
			<h2><b>Example 05:</b> Get real filelist</h2>
			<button type = "button" @click = "ex05fetch">Fetch</button>
				<details>
					<summary>File list json</summary>
					<pre>{{ ex05data }}</pre>
				</details>
		</div>

		<div>
			<h2><b>Example 06:</b> Get real folderlist</h2>
			<button type = "button" @click = "ex06fetch">Fetch</button>
				<details>
					<summary>File list json</summary>
					<pre>{{ ex06data }}</pre>
				</details>
		</div>

		<div>
			<h2><b>Example 07:</b> Download file</h2>
			<a href = "/vueapi/file?id=c5eb0903-ce68-4e97-8d67-4123cce0b0e8">Download file</a>
		</div>

		<div>
			<h2><b>Example 08:</b> Delete file</h2>
			<input v-model = "ex08fileid">
			<p>File id: {{ ex08fileid }}</p>
			<button @click = "ex08delete">Delete</button>
			<p>Server response {{ ex08data }}</p>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				ex01data: "",
				ex02path: "",
				ex02fileInput: [],
				ex02serverResponse: "",
				ex03data: {},
				ex04data: {},
				ex05data: {},
				ex06data: {},
				ex08fileid: "",
				ex08data: ""
			}
		},
    methods: {
      async ex01fetch(){
        const response = await fetch('/vueapi/fetchtest/');
        this.ex01data = await response.text();
      },
			ex02onChange(event){
				this.ex02fileInput = [...event.target.files];
			},
			async ex02submitFiles(){
				if(this.ex02path === null){
					alert("No path specified!");
					return;
				}
				let formData = new FormData();
				formData.append('path', this.ex02path);
				if(this.ex02fileInput){
					for (let i = 0; i < this.ex02fileInput.length; i++) {
						formData.append('file', this.ex02fileInput[i]);          
					}
				}
				console.log(formData);

        try {
          const response = await fetch('/vueapi/upload/', {
            method: "PUT",
            body: formData
          });
          const result = await response.text();
          this.ex02serverResponse = result;
        } catch (error) {          
          this.ex02serverResponse = error;
        }
			},
			async ex03fetch(){
        const response = await fetch('/vueapi/filelisttest/');
        this.ex03data = await response.json();
      },
			async ex04fetch(){
				const response = await fetch('/vueapi/foldertreetest/');
        this.ex04data = await response.json();
      },
			async ex05fetch(){
				const response = await fetch('/vueapi/filelist/');
        this.ex05data = await response.json();
      },
			async ex06fetch(){
				const response = await fetch('/vueapi/foldertree/');
        this.ex06data = await response.json();
      },
			async ex08delete(){
				
				
				const response = await fetch(`/vueapi/file?id=${this.ex08fileid}`, {
					method: "DELETE",
				});
				this.ex08data = await response.text();
			}
    }
  }
</script>

<style scoped>
  #test-page {
		padding: 20px 20px 80px 20px;
		

	}

</style>