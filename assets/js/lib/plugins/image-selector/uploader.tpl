<div id="image-uploader">
    <p class="hdr">Image Uploader<a class="close">X</a></p>
    <form action="/cms/ajax/upload" method="post" enctype="multipart/form-data">
        <p><label>File</label><input type="file" name="file" /></p>
        <p><label>Description</label><input type="text" name="description"/></p>
        <p><label>Caption</label><input type="text" name="caption"/></p>
        <p><label>Source</label><input type="text" name="source"/></p>
        <p><label>Link</label><input type="text" name="link"/></p>
        <p><label>Is Chart?</label><input type="checkbox" name="tags[]" class="tag-toggle" /></p>
        <div class="tag-list"><label>Tags</label>
            <ul>
                <li><input type="checkbox" name="tags[]" value="Housing"/></li>
                <li><input type="checkbox" name="tags[]" value="Stocks"/></li>
                <li><input type="checkbox" name="tags[]" value="Currencies"/></li>
                <li><input type="checkbox" name="tags[]" value="Oil"/></li>
                <li><input type="checkbox" name="tags[]" value="Employment"/></li>
                <li><input type="checkbox" name="tags[]" value="Tech"/></li>
                <li><input type="checkbox" name="tags[]" value="Advertising"/></li>
                <li><input type="checkbox" name="tags[]" value="Startups"/></li>
                <li><input type="checkbox" name="tags[]" value="Retail"/></li>
                <li><input type="checkbox" name="tags[]" value="Sports"/></li>
            </ul>
        </div>
        <input type="hidden" value="json" name="format" />
        <p><button>Upload</button></p>
    </form>
</div>
